<template>
  <BaseModal
    @show:modal="renderEpisodes()"
    @close:modal="clearRenderedEpisodes()"
  >
    <template #icon>
      <Tv 
        size="2.5em"
        class="stroke-2"
      />
    </template>
    
    <!-- begin: Title Name Character -->
    <h1 
      v-if="!!characterName"
      class="text-center text-xl font-bold"
    >
      {{ characterName }}'s Episodes
    </h1>
    <!-- end: Title Name Character -->
    <!-- begin: Table Episodes -->
    <Table 
      :data="renderedEpisodes"
      :columns="['episode', 'name', 'air_date']"
      class="mx-20 mt-5 mb-20"
    >
      <template #search>
        <SearchTable
          :search-options="['episode', 'name']"
          @send:search-object="(value) => {
            filterEpisodes(value)
            console.log(value)

          }"
        />
      </template>
    </Table>
    <!-- end: Table Episodes -->
  </BaseModal>
</template>

<script setup>
import BaseModal from './BaseModal.vue';
import Table from '../table/Table.vue';
import SearchTable from '../table/handler/SearchTable.vue';
import { Tv } from 'lucide-vue-next';
import { ramRouter } from '@/services/api/routing/routers/ramRouter';
import { ref } from 'vue';

const props = defineProps({
  episodesUrl: {
    type: Array,
    required: true
  },
  characterName: {
    type: String,
    default: ''
  }
})

const getID = (episodesUrl) => episodesUrl.map((url) => url.split('/').pop())

const idEpisodes = ref(getID(props.episodesUrl))

const renderedEpisodes = ref([])

const renderEpisodes = () => {
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

const filterEpisodes = (searchObject) => {
  ramRouter.episodes.getByQuery(searchObject.value, searchObject.option)
  .then((response) => {
    const episodes = response.data.results
    renderedEpisodes.value = episodes
  })
  .catch((error) => {
    console.error(error)
    const episodes = []
    renderedEpisodes.value = episodes
  })
}

</script>