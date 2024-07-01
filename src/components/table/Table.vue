<template>
  <div 
      class="border border-gray-300 text-gray-800 overflow-x-auto"
  >
    <!-- begin: Search -->
    <slot name="search"></slot>
    <!-- end: Search -->
    <table
        v-if="props.data.length !== 0" 
        class="w-full"
    >
      <!-- begin: Header  -->
      <tr class="bg-gray-50">
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
        <td v-for="item in Object.values(row)" class="px-14 py-2 text-center text-base">
          <div v-if="Array.isArray(item)" class="flex justify-center">
            <CharactersModal 
                :characters-url="item"
            />
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
      No data was found...
    </div>
    <!-- begin: Pagination -->
    <slot name="pagination"></slot>
    <!-- end: Pagination -->
  </div>
</template>

<script setup>
import { computed, ref, } from 'vue';
import { filterArrayOfObjects } from '@/utils/utilsObject.js';
import CharactersModal from '@/components/modal/CharactersModal.vue'

const props = defineProps({
  columns: {
    type: [Array, Boolean],
    default: false,
  },
  data: {
    type: Array,
    required: true,
  },
})

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

const selectedSearchOption = ref('');
const searchValue = ref('')

const clearSearch = () => {
  searchValue.value = ''
  selectedSearchOption.value = ''
}

</script>