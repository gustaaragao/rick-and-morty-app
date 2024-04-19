<template>
  {{ character.name }}
</template>

<script setup>
import { Star } from 'lucide-vue-next'
import { ref } from 'vue'

const fillIcon = ref(false)

const props = defineProps({
  character: {
    type: Object,
    required: true
  }
})
</script>
