<template>
  <BaseModal :show-modal="props.showCharacters">
    <div v-for="character in props.characters">
      {{ character }}
    </div>
  </BaseModal>
</template>

<script setup>
import BaseModal from './BaseModal.vue';

const props = defineProps({
  showCharacters: {
    type: Boolean,
    default: false,
  },
  characters: {
    type: Array,
    default: [],
  },
})

</script>