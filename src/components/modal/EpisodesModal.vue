<template>
  <BaseModal
    @show:modal="searchEpisodes()"
    @close:modal="clearRenderedEpisodes()"
  >
    <template #icon>
      <Tv 
        size="2.5em"
        class="stroke-2"
      />
    </template>
    
    <!-- TODO: ADICIONAR PESQUISA -->
    <Table 
      :data="renderedEpisodes"
      :columns="['episode', 'name', 'air_date']"
      class="mt-2"
    />
    
  </BaseModal>
</template>

<script setup>
import BaseModal from './BaseModal.vue';
import Table from '../table/Table.vue';
import { Tv } from 'lucide-vue-next';
import { ramRouter } from '@/services/api/routing/routers/ramRouter';
import { ref } from 'vue';

const props = defineProps({
  episodesUrl: {
    type: Array,
    required: true
  }
})

const getID = (episodesUrl) => episodesUrl.map((url) => url.split('/').pop())

const idEpisodes = ref(getID(props.episodesUrl))

const renderedEpisodes = ref([])

const searchEpisodes = () => {
  idEpisodes.value.map((id) => {
    ramRouter.episodes.getByID(id)
    .then((response) => {
      const episode = response.data
      renderedEpisodes.value.push(episode)
    })
  })
}

const clearRenderedEpisodes = () => {
  renderedEpisodes.value = []
}

</script>