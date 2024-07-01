<template>
  <Table
    :columns="['episode', 'name', 'air_date', 'characters']"
    :data="episodesData"
    class="my-10"
  >
    <template #search>
      <SearchTable 
        :search-options="['episode', 'name']"
        @send:search-object="(searchObject) => search(searchObject)"
      />
    </template>
    <template #pagination>
      <Pagination 
        v-if="showPagination"
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
import { onMounted, ref, computed } from 'vue';

const episodesData = ref([])
const episodesInfo = ref({})

const showPagination = computed(() => episodesInfo?.value?.pages != 1)

const search = (searchObject) => {
  ramRouter.episodes.getByQuery(searchObject.option, searchObject.value)
  .then((response) => {
    episodesData.value = response.data.results
    episodesInfo.value = response.data.info
    console.log(response.data.info)
  })
  .catch((err) => {
    console.error(err);
  })
}

const loadNextPage = () => {
  console.log('next');
}
  
const loadPreviousPage = () => {
  console.log('previous');
}

onMounted(() => {
  ramRouter.episodes.getAll()
  .then((response) => {
    episodesData.value = response.data.results
    episodesInfo.value = response.data.info
  })
})
</script>