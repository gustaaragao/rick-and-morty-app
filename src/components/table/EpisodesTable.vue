<template>
  <Table
    :columns="['episode', 'name', 'air_date', 'characters']"
    :data="episodesData"
    :info="episodesInfo"
    :search-options="['episode', 'name']"
  />
</template>

<script setup>
import Table from '@/components/table/Table.vue'
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