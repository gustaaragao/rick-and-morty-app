<template>
  <Table
    :columns="['name', 'type', 'dimension', 'residents']"
    :data="locationsData"
  >
    <template #search>
      <SearchTable 
        :search-options="['name', 'type', 'dimension']"
        @update:search-value="(searchObject) => search(searchObject)"
      />
    </template>
    <template #pagination>
      <Pagination 
        :info="locationsInfo"
        @load:previous-page="loadPreviousPage()"
        @load:next-page="loadNextPage()"
      />
    </template>
  </Table>
</template>

<script setup>
import Table from '@/components/table/Table.vue'
import SearchTable from './handler/SearchTable.vue';
import Pagination from './handler/Pagination.vue';
import { ramRouter } from '@/services/api/routing/routers/ramRouter';
import { onMounted, ref } from 'vue';

const locationsData = ref([])
const locationsInfo = ref({})

onMounted(() => {
  ramRouter.locations.getAll().then((response) => {
    locationsData.value = response.data.results
    locationsInfo.value = response.data.info
  })
})
</script>