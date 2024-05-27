<template>
  <div class="flex justify-center gap-4 py-6">
    <div v-for="option in props.selectedOptions" class="flex items-center gap-2 py-0.5 px-2 bg-white
         border-2 border-gray-400 text-sm text-gray-400 rounded-full">
      <p class="font-semibold"> {{ option }} </p>
      <i class="cursor-pointer" @click="removeOption(props.selectedOptions, option)">
        <X size="14" absoluteStrokeWidth="false" />
      </i>
    </div>
  </div>
</template>

<script setup>

import { X } from 'lucide-vue-next';

const props = defineProps({
  selectedOptions: {
    type: Array,
    required: true,
  },
})

const removeOption = (selectedOptions, option) => {
  const index = selectedOptions.indexOf(option)

  if (index > -1) {
    selectedOptions.splice(index, 1)
  }
}

</script>