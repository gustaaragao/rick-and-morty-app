<template v-if="showModal">
  <BaseModal 
    @show:modal="searchCharacters()"
    @close:modal="clearRenderedCharacters()"
  >
    <div v-for="character in renderedCharacters" class="px-10 py-4">
      <!-- TODO: FAZER SISTEMA SEARCH DOS CHARACTERS -->
      <VisualizerCharacter
        :character="character"
        :design-horizontal="true"
      />
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
      renderedCharacters.value.push(character)
    })
  })
}

const clearRenderedCharacters = () => {
  renderedCharacters.value = []
}
</script>