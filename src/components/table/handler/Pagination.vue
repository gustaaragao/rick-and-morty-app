<template>
  <div class="w-full flex justify-end px-8 py-4 text-sm bg-gray-50">
    <div class="flex items-center gap-3">
      <!-- TODO: FAZER UM SELECT E MUDAR OS BOTÕES PARA COMPONENTES -->
      <!-- begin: Select Page -->
      <SelectInput 
        :options="range(1, props.info.pages+1)"
        :model-value="currentPage"
        input-name="select-page"
        @update:model-value="(value) => {
          currentPage = value;
          selectPage()
        }"
      />
      <!-- end: Select Page -->
      <p>of {{ props.info.pages }} pages</p>
      <div class="flex items-center gap-2">
        <!-- begin: Load Previous Page -->
        <button
          :disabled="disablePreviousButton"  
          @click="loadPreviousPage()"
          class="border border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft />
        </button>
        <!-- end: Load Previous Page -->
        <!-- begin: Load Next Page -->
        <button
          :disabled="disableNextButton"
          @click="loadNextPage()" 
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
import { computed, ref } from 'vue';
import { range } from '@/utils/range';
import SelectInput from '@/components/inputs/SelectInput.vue';

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

const emit = defineEmits(['load:next-page', 'load:previous-page', 'load:selected-page'])

const disablePreviousButton = computed(() => !!!props.previousPage)
const disableNextButton = computed(() => !!!props.nextPage)

const loadNextPage = () => {
  emit('load:next-page')
  currentPage.value++
}

const loadPreviousPage = () => {
  emit('load:previous-page')
  currentPage.value--
}

const currentPage = ref(1);

const selectPage = () => {
  const numberOfPage = `page=${currentPage.value}`
  emit('load:selected-page', numberOfPage)
}
</script>