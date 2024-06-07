<template>
  <div 
      class="overflow-x-auto mt-20 mb-10 
             border border-gray-300 shadow-xl text-gray-800"
  >
    <!-- begin: Search -->
    <div class="w-full flex justify-between align-middle items-center px-6 py-4 text-sm bg-gray-50">
      <BaseInput class="w-full">
        <template #icon>
          <Search />
        </template>
      </BaseInput>
      <div class="pr-8">
        <RadioInput
            class="flex gap-8 text-nowrap" 
            :options="searchOptions ? searchOptions : processedHeaderNames"
            @update:model-value="(value) => {searchOption = value}"
        />
      </div>
      <BaseButton design="LightButton" color-button="gray-400" color-hover-effect="gray-500">
        <template #icon>
          <Eraser /> 
        </template>
      </BaseButton>
    </div>
    <!-- end: Search -->
    <table
        v-if="props.data.length !== 0" 
        class="w-full"
    >
      <!-- begin: Header  -->
      <tr class="bg-gray-50 border-y border-gray-300">
        <th v-for="name in processedHeaderNames" class="px-8 py-3 text-center text-base">
          {{ name }}
        </th>
      </tr>
      <!-- end: Header -->
      <!-- begin: Rows -->
      <tr 
          v-for="row in processedRows" 
          class="odd:bg-gray-50 even:bg-gray-200 border-b border-gray-300"
      >
        <td v-for="item in Object.values(row)" class="px-8 py-2 text-center text-base">
          <div v-if="Array.isArray(item)" class="flex justify-center">
            <button @click="handleButton(item)">
              <Eye />
            </button>
          </div>
          <span v-else>
            {{ item }}
          </span>
        </td>
      </tr>
      <!-- end: Rows -->
    </table>
    <div 
        v-else
        class="bg-gray-50 text-center py-8"
    >
      Nenhum dado foi encontrado...
    </div>
    <!-- begin: Pagination -->
    <!-- TODO: SELECT -->
    <div class="w-full flex justify-end px-8 py-4 text-sm bg-gray-50">
      <!-- begin: Page -->
      <div class="flex items-center gap-3">
        <select>
          <option
              v-for="page in props.info.pages" 
              :value="page"
          >
            {{ page }}
          </option>    
        </select>
        <p>of {{ props.info.pages }} pages</p>
        <div class="flex items-center gap-2">
          <button class="border border-gray-300">
            <ChevronLeft />
          </button>
          <button class="border border-gray-300">
            <ChevronRight />
          </button>
        </div>
      </div>
      <!-- end: Page -->
    </div>
    <!-- end: Pagination -->
  </div>

  <CharactersModal :show-characters="showCharacters.value" :characters="characters" />
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { Eye, Search, Eraser, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { filterArrayOfObjects } from '@/utils/utilsObject.js';
import { range } from '@/utils/range';
import CharactersModal from '@/components/modal/CharactersModal.vue'
import BaseInput from '@/components/inputs/text/BaseInput.vue';
import RadioInput from '@/components/inputs/radio/RadioInput.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';

const props = defineProps({
  columns: {
    type: [Array, Boolean],
    default: false,
  },
  data: {
    type: Array,
    required: true,
  },
  info: {
    type: Object,
    required: true
  },
  searchOptions: {
    type: [Array, Boolean],
    default: false,
  },
})

const showCharacters = ref(false)

const characters = ref([])

const handleButton = (characters) => {
  characters.value = characters

  showCharacters.value = true
}

const processedHeaderNames = computed(() => {
  let columnsName;
  // Check if props.columns is not passed or if it is an empty array
  if (!props.columns || props.columns?.length === 0) {
    columnsName = Object.keys(props.data[0])
  } else {
    // If `props.columns` is passed, it's used in the table header
    columnsName = props.columns
  }

  return columnsName.map((name) => {
    const nameWithoutUnderscore = name.replace('_', ' ')

    return nameWithoutUnderscore.charAt(0).toUpperCase() + nameWithoutUnderscore.slice(1)
  })
})

const processedRows = computed(() => {
  //  Check if props.columns is passed and if it is not an empty array
  if (props.columns && props.columns?.length !== 0) {
    return filterArrayOfObjects(props.data, props.columns)
  }

  return props.data
})

const processCount = (count) => {
  return range(0, count, 5).slice(1)
}

const searchOption = ref();
watch(searchOption, () => {
  console.log(searchOption.value);
})

</script>