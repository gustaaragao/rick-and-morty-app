<template>
  <div class="w-full flex justify-between align-middle items-center px-6 py-4 text-sm">
    <!-- begin: Search Input -->
    <BaseInput
        :disabled="selectedSearchOption === ''"
        :model-value="searchValue"
        @update:model-value="(value) => { searchValue = value }"
    >
      <template #icon>
        <Search />
      </template>
    </BaseInput>
    <!-- end: Search Input -->
    <!-- begin: Options -->
    <div class="flex align-middle text-center items-center mx-4">
      <RadioInput 
          class="flex gap-8 text-nowrap" 
          :options="searchOptions"
          :model-value="selectedSearchOption"
          @update:model-value="(value) => { selectedSearchOption = value }"
      />
    </div>
    <!-- end: Options -->
    <div class="flex gap-3">
      <!-- begin: Search Button -->
      <BaseButton
        @click="sendSearchValue()"
        :disabled="selectedSearchOption === '' || searchValue === ''"
        color-button="green-600"
        color-hover-effect="green-700"
        class="rounded-md"
      >
        <template #icon>
          <Search />
        </template>
        <template #text>
          Search
        </template>
      </BaseButton>
      <!-- end: Search Button -->
      <!-- begin: Clear Button -->
      <BaseButton 
          @click="clearSearch()" 
          color-button="gray-400" 
          color-hover-effect="gray-500"
          class="rounded-lg"
      >
        <template #icon>
          <Eraser />
        </template>
      </BaseButton>
      <!-- end: Clear Button -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseInput from '@/components/inputs/BaseInput.vue';
import RadioInput from '@/components/inputs/RadioInput.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';
import { Eraser, Search } from 'lucide-vue-next';

const props = defineProps({
  searchOptions: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['send:search-object'])

const selectedSearchOption = ref('');
const searchValue = ref('')

const sendSearchValue = () => {
  const searchObject = {'value': searchValue.value, 'option': selectedSearchOption.value}
  emit('send:search-object', searchObject)
}

const clearSearch = () => {
  searchValue.value = ''
  selectedSearchOption.value = ''

  sendSearchValue()
}
</script>