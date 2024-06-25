<template>
  <Table
    :columns="['episode', 'name', 'air_date', 'characters']"
    :data="episodesData"
    class="my-10"
  >
    <template #search>
      <SearchTable 
        :search-options="['episode', 'name']"
        @update:search-value="(searchObject) => search(searchObject)"
      />
    </template>
    <template #pagination>
      <Pagination 
        :info="episodesInfo"
        @load:previous-page="loadPreviousPage()"
        @load:next-page="loadNextPage()"
      />
    </template>
  </Table>
</template>

<script setup>
import Table from '@/components/table/Table.vue';
import SearchTable from './handler/SearchTable.vue';
import Pagination from './handler/Pagination.vue';
import { ramRouter } from '@/services/api/routing/routers/ramRouter';
import { onMounted, ref } from 'vue';

const episodesData = ref([])
const episodesInfo = ref({})

const search = (searchObject) => {
  console.log(searchObject.value)
  console.log(searchObject.option)
}

const loadNextPage = () => {
  console.log('next');
  }
  
const loadPreviousPage = () => {
  console.log('previous');
}

onMounted(() => {
  ramRouter.episodes.getAll().then((response) => {
    episodesData.value = response.data.results
    episodesInfo.value = response.data.info
  })
})
</script>