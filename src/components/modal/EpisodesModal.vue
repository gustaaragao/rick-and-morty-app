<template>
  <BaseModal
    @show:modal="searchEpisodes()"
    @close:modal="clearRenderedEpisodes()"
  >
    <template #icon>
      <Tv 
        size="3em"
        class="stroke-2"
      />
    </template>

    <div v-for="episode in renderedEpisodes">
      <VisualizerEpisode  
        :episode="episode"
      />
    </div>
  </BaseModal>
</template>

<script setup>
import BaseModal from './BaseModal.vue';
import { Tv } from 'lucide-vue-next';
import VisualizerEpisode from '../visualizer/VisualizerEpisode.vue';
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