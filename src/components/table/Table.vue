<template>
  <div id="table-container" class="mx-20">
    <table class="w-full">
      <!-- begin: Header  -->
      <tr>
        <th v-for="name in computedHeaderNames">
          {{ name }}
        </th>
      </tr>
      <!-- end: Header -->
      <!-- begin: Rows -->
      <tr v-for="row in props.rows">
        <td v-for="item in Object.values(row)" class="text-center">
          {{ item }}
        </td>
      </tr>
      <!-- end: Rows -->
    </table>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';

const props = defineProps({
  rows: {
    type: Object,
    required: true,
  },
})

const computedHeaderNames = computed(() => {
  return Object.keys(props.rows[0]).map((name) => name.toUpperCase().replace('_', ' '))
})
</script>

<style scoped>

#table-container {
  width: 100%;
  border: 2px solid rgb(229 231 235);
  border-radius: 0.5em
}


th,td {
  border-right: 2px solid rgb(229 231 235);
}

th:last-child, td:last-child {
  border-right: 0px;
}

td {
  border-top: 2px solid rgb(229 231 235);
}
</style>