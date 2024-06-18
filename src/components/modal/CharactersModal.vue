<template>
  <BaseModal>
    <div v-for="character in props.characters">
      {{ character }}
    </div>
  </BaseModal>
</template>

<script setup>
import BaseModal from './BaseModal.vue';

const props = defineProps({
  characters: {
    type: Array,
    default: [],
  },
})

</script>