<template>
  <BaseModal>
    <div 
      v-for="id in idCharacters"
    >
      {{ id }}
    </div>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue';
import BaseModal from './BaseModal.vue';
import VisualizerCharacter from '../visualizer/VisualizerCharacter.vue';
import { ramRouter } from '@/services/api/routing/routers/ramRouter';

const props = defineProps({
  characters: {
    type: Array,
    default: [],
  },
})

const getID = (characters) => characters.map((character) => character.split('/').pop())

const idCharacters = ref(getID(props.characters))
</script>