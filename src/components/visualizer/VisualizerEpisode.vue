<template>
  {{ episode }}
</template>

<script setup>
const props = defineProps({
  episode: {
    type: Object,
    required: true
  }
})
</script>