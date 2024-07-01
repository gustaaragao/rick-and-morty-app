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
          :disabled="disablePreviousButton"  
          @click="emit('load:previous-page')"
          class="border border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft />
        </button>
        <!-- end: Load Previous Page -->
        <!-- begin: Load Next Page -->
        <button
          :disabled="disableNextButton"
          @click="emit('load:next-page')" 
          class="border border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
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
import { computed, watch } from 'vue';

const props = defineProps({
  info: {
    type: Object,
    required: true,
  },
  previousPage: {
    type: String,
    default: ''
  },
  nextPage: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['load:next-page', 'load:previous-page'])

const disablePreviousButton = computed(() => !!!props.previousPage)
const disableNextButton = computed(() => !!!props.nextPage)
</script>