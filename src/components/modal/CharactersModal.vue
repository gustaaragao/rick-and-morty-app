<template v-if="showModal">
  <BaseModal 
    @show:modal="searchCharacters()"
    @close:modal="clearRenderedCharacters()"
  >
    <div 
      v-for="character in renderedCharacters"
    >
      {{ character }}

      <!-- <VisualizerCharacter 
        :character="character"
      /> -->
    </div>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue';
import BaseModal from './BaseModal.vue';
import VisualizerCharacter from '../visualizer/VisualizerCharacter.vue';
import { ramRouter } from '@/services/api/routing/routers/ramRouter';

const props = defineProps({
  charactersUrl: {
    type: Array,
    default: [],
  },
})

const getID = (charactersUrl) => charactersUrl.map((url) => url.split('/').pop())

const idCharacters = ref(getID(props.charactersUrl))

const renderedCharacters = ref([])

const searchCharacters = () => {
  idCharacters.value.map((id) => {
    ramRouter.characters.getByID(id).then((response) => {
      const character = response.data
      renderedCharacters.value.push(character.name) // TODO: Retirar esse '.name'
    })
  })
}

const clearRenderedCharacters = () => {
  renderedCharacters.value = []
}
</script>