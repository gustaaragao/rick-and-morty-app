<template>
  <div class="w-full flex justify-between align-middle items-center px-6 py-4 text-sm bg-gray-50">
    <!-- begin: Search Input -->
    <BaseInput 
        class="w-full" 
        :disabled="selectedSearchOption === ''"
        @update:model-value="(value) => { searchValue = value }"
    >
      <template #icon>
        <Search />
      </template>
    </BaseInput>
    <!-- end: Search Input -->
    <!-- begin: Options -->
    <div class="pr-8">
      <RadioInput 
          class="flex gap-8 text-nowrap" 
          :options="searchOptions"
          @update:model-value="(value) => { selectedSearchOption = value }"
      />
    </div>
    <!-- end: Options -->
    <div class="flex gap-3">
      <!-- begin: Search Button -->
      <BaseButton
        @click="sendSearchValue()"
        :disabled="selectedSearchOption === '' || searchValue === ''"
        color-button="purple-600"
        color-hover-effect="purple-700"
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
          design="LightButton" 
          color-button="gray-400" 
          color-hover-effect="gray-500"
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
import BaseInput from '@/components/inputs/text/BaseInput.vue';
import RadioInput from '@/components/inputs/radio/RadioInput.vue';
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
}

</script>