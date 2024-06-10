<template>
  <div class="w-full flex justify-end px-8 py-4 text-sm bg-gray-50">
    <div class="flex items-center gap-3">
      <!-- TODO: FAZER UM SELECT E MUDAR OS BOTÕES PARA COMPONENTES -->
      <!-- begin: Select Page -->
      <select>
        <option v-for="page in props.info.pages" :value="page">
          {{ page }}
        </option>
      </select>
      <!-- end: Select Page -->
      <p>of {{ props.info.pages }} pages</p>
      <div class="flex items-center gap-2">
        <!-- begin: Load Previous Page -->
        <button 
            @click="emit('load:previous-page')"
            class="border border-gray-300"
        >
          <ChevronLeft />
        </button>
        <!-- end: Load Previous Page -->
        <!-- begin: Load Next Page -->
        <button
            @click="emit('load:next-page')" 
            class="border border-gray-300"
        >
          <ChevronRight />
        </button>
        <!-- end: Load Next Page -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

const props = defineProps({
  info: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['load:next-page', 'load:previous-page'])
</script>