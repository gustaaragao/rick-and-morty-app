<template>
  <Table
    :columns="['name', 'type', 'dimension', 'residents']"
    :data="locationsData"
    class="my-10"
  >
    <template #search>
      <SearchTable 
        :search-options="['name', 'type', 'dimension']"
        @send:search-object="(searchObject) => search(searchObject)"
      />
    </template>
    <template #pagination>
      <Pagination 
        v-if="showPagination"
        :info="locationsInfo"
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

const locationsData = ref([])
const locationsInfo = ref({})

const showPagination = computed(() => locationsInfo?.value?.pages != 1)

const previousPage = computed(() => getPage(locationsInfo.value.prev))
const nextPage = computed(() => getPage(locationsInfo.value.next))

const search = (searchObject) => {
  ramRouter.locations.getByQuery(searchObject.option, searchObject.value)
  .then((response) => {
    locationsData.value = response.data.results
    locationsInfo.value = response.data.info
  })
  .catch((err) => {
    console.error(err);
  })
}

const loadPreviousPage = () => {
  ramRouter.locations.loadPage(previousPage.value)
  .then((response) => {
    locationsData.value = response.data.results
    locationsInfo.value = response.data.info
  })
  .catch((err) => {
    console.err(err);
  })
}

const loadNextPage = () => {
  ramRouter.locations.loadPage(nextPage.value)
  .then((response) => {
    locationsData.value = response.data.results
    locationsInfo.value = response.data.info
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

  ramRouter.locations.loadPage(page.value)
  .then((response) => {
    locationsData.value = response.data.results
    locationsInfo.value = response.data.info
  })
  .catch((err) => {
    console.error(err);
  })
}

onMounted(() => {
  ramRouter.locations.getAll()
  .then((response) => {
    locationsData.value = response.data.results
    locationsInfo.value = response.data.info
  })
  .catch((err) => {
    console.error(err);
  })
})
</script>