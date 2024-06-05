<template>
  <div 
      class="overflow-x-auto mt-20 mb-10 
             border border-gray-300 shadow-xl text-gray-800"
  >
    <div class="w-full flex justify-between px-8 py-4 text-sm bg-gray-50 gap-10">
      <BaseInput>
        <template #icon>
          <Search />
        </template>
      </BaseInput>
      <select>
        <option value="episode">Episode</option>
        <option value="name">Name</option>
        <option value="air_date">Air date</option>
      </select>
    </div>
    <table class="w-full">
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
        <td v-for="item in Object.values(row)" class="py-2 text-center text-base">
          <div v-if="Array.isArray(item)" class="flex justify-center">
            <button @click="handleButton(item)">
              <Plus />
            </button>
          </div>
          <span v-else>
            {{ item }}
          </span>
        </td>
      </tr>
      <!-- end: Rows -->
    </table>
    <!-- begin: Pagination -->
    <!-- TODO: SELECT -->
    <div class="w-full flex justify-between px-8 py-4 text-sm bg-gray-50">
      <div class="flex items-center gap-3 ">
        <p>Items per page:</p>
        <select>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <p>1-5 of 100 items</p>
      </div>
      <div class="flex items-center gap-3">
        <select>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>    
        </select>
        <p>of 40 pages</p>
        <div class="flex items-center gap-2">
          <button class="border border-gray-300">
            <ChevronLeft />
          </button>
          <button class="border border-gray-300">
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
    <!-- end: Pagination -->
  </div>

  <CharactersModal :show-characters="showCharacters.value" :characters="characters" />
</template>

<script setup>
import { computed, ref } from 'vue';
import { Plus, Search, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { filterArrayOfObjects } from '@/utils/utilsObject.js';
import CharactersModal from '@/components/modal/CharactersModal.vue'
import BaseInput from '@/components/inputs/text/BaseInput.vue';
import Select from '@/components/inputs/select/Select.vue';

const props = defineProps({
  columns: {
    type: [Array, Boolean],
    default: false,
  },
  rows: {
    type: Object,
    required: true,
  },
})

const showCharacters = ref(false)

const characters = ref([])

const handleButton = (characters) => {
  characters.value = characters

  showCharacters.value = true

  console.log(showCharacters.value)
}

const processedHeaderNames = computed(() => {
  let columnsName;
  // Check if props.columns is not passed or if it is an empty array
  if (!props.columns || props.columns?.length === 0) {
    columnsName = Object.keys(props.rows[0])
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
    return filterArrayOfObjects(props.rows, props.columns)
  }

  return props.rows
})
</script>