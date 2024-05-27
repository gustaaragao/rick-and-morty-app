<template>
  <div id="table-container" class="mx-96 mt-20">
    <table class="w-full">
      <!-- begin: Header  -->
      <tr>
        <th v-for="name in processedHeaderNames">
          {{ name }}
        </th>
      </tr>
      <!-- end: Header -->
      <!-- begin: Rows -->
      <tr v-for="row in processedRows">
        <td v-for="item in Object.values(row)" class="text-center">
          <button v-if="Array.isArray(item)"
                  @click="handleButton(item)"
          >
            Array
          </button>
          <span v-else>
            {{ item }}
          </span>
        </td>
      </tr>
      <!-- end: Rows -->
    </table>
  </div>

  <CharactersModal :show-characters="showCharacters.value"
                   :characters="characters"
  />
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { filterArrayOfObjects, sortKeysofObject } from '@/utils/utilsObject.js';
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
  border: 2px solid rgb(229 231 235);
  border-radius: 0.5em
}


th,
td {
  border-right: 2px solid rgb(229 231 235);
}

th:last-child,
td:last-child {
  border-right: 0px;
}

td {
  border-top: 2px solid rgb(229 231 235);
}
</style>