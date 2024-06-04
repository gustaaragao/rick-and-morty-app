<template>
  <div id="table-container" class="overflow-x-auto mx-40 mt-20 mb-10">
    <table class="w-full">
      <!-- begin: Header  -->
      <tr>
        <th v-for="name in processedHeaderNames" class="px-4 py-3 text-xl">
          {{ name }}
        </th>
      </tr>
      <!-- end: Header -->
      <!-- begin: Rows -->
      <tr v-for="row in processedRows">
        <td v-for="item in Object.values(row)" class="p-2 text-center text-lg">
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
  </div>

  <CharactersModal :show-characters="showCharacters.value" :characters="characters" />
</template>

<script setup>
import { computed, ref } from 'vue';
import { Plus } from 'lucide-vue-next';
import { filterArrayOfObjects } from '@/utils/utilsObject.js';
import CharactersModal from '@/components/modal/CharactersModal.vue'

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

  return columnsName.map((name) => name.toUpperCase().replace('_', ' '))
})

const processedRows = computed(() => {
  //  Check if props.columns is passed and if it is not an empty array
  if (props.columns && props.columns?.length !== 0) {
    return filterArrayOfObjects(props.rows, props.columns)
  }

  return props.rows
})
</script>

<style scoped>
#table-container {
  width: 100%;
  border: 1.5px solid rgb(156 163 175);
  border-radius: 0.5em
}

th:last-child,
td:last-child {
  border-right: 0px;
}

th {
  border-right: 1.5px solid rgb(156 163 175);
}

td {
  border-right: 1.5px solid rgb(156 163 175);
  border-top: 1.5px solid rgb(156 163 175);
}


tr:nth-child(odd) {
  background-color: rgb(209 213 219);
}

tr:nth-child(even) {
  background-color: rgb(243 244 246);
}
</style>