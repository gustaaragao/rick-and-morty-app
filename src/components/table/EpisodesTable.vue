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
        :previous-page="previousPage"
        :next-page="nextPage"
        @load:previous-page="loadPreviousPage()"
        @load:next-page="loadNextPage()"
        @load:selected-page="(numberOfPage) => loadSelectedPage(numberOfPage)"
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
import { getPage, replaceNumberOfPage } from '@/utils/pagination';

const episodesData = ref([])
const episodesInfo = ref({})

const showPagination = computed(() => episodesInfo?.value?.pages != 1)

const previousPage = computed(() => getPage(episodesInfo.value.prev))
const nextPage = computed(() => getPage(episodesInfo.value.next))

const search = (searchObject) => {
  ramRouter.episodes.getByQuery(searchObject.option, searchObject.value)
  .then((response) => {
    episodesData.value = response.data.results
    episodesInfo.value = response.data.info
  })
  .catch((err) => {
    episodesData.value = []
    console.error(err);
  })
}

const loadPreviousPage = () => {
  ramRouter.episodes.loadPage(previousPage.value)
  .then((response) => {
    episodesData.value = response.data.results
    episodesInfo.value = response.data.info
  })
  .catch((err) => {
    console.err(err);
  })
}

const loadNextPage = () => {
  ramRouter.episodes.loadPage(nextPage.value)
  .then((response) => {
    episodesData.value = response.data.results
    episodesInfo.value = response.data.info
  })
  .catch((err) => {
    console.err(err);
  })
}

const loadSelectedPage = (numberOfPage) => {
  const page = computed(() => {
    if (previousPage.value) {
      return replaceNumberOfPage(numberOfPage, previousPage.value)
    } else {
      return replaceNumberOfPage(numberOfPage, nextPage.value)
    }
  })

  ramRouter.episodes.loadPage(page.value)
  .then((response) => {
    episodesData.value = response.data.results
    episodesInfo.value = response.data.info
  })
  .catch((err) => {
    console.error(err);
  })
}

onMounted(() => {
  ramRouter.episodes.getAll()
  .then((response) => {
    episodesData.value = response.data.results
    episodesInfo.value = response.data.info
  })
  .catch((err) => {
    console.error(err);
  })
})
</script>