<template>
  <Table
    :columns="['episode', 'name', 'air_date', 'characters']"
    :data="episodesData"
    :info="episodesInfo"
    :search-options="['episode', 'name']"
  >
    <template #search>
      <SearchTable 
        :search-options="['episode', 'name']"
      />
    </template>
  </Table>
</template>

<script setup>
import Table from '@/components/table/Table.vue';
import SearchTable from './handler/SearchTable.vue';
import { ramRouter } from '@/services/api/routing/routers/ramRouter';
import { onMounted, ref } from 'vue';

const episodesData = ref([])
const episodesInfo = ref({})

const selectedSearchOption = ref('')

const searchedName = ref('')
const searchedEpisode = ref('')

onMounted(() => {
  ramRouter.episodes.getAll().then((response) => {
    episodesData.value = response.data.results
    episodesInfo.value = response.data.info
  })
})
</script>