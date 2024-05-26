<template>
  <div class="flex justify-center pt-10">
    <!-- begin: Table -->
    <Table
    :columns="['episode', 'name', 'air_date', 'characters']"
    :rows="episodesData"
    />
    <!-- end: Table -->
    
  </div>
</template>

<script setup>
import Table from '@/components/table/Table.vue'
import { ramRouter } from '@/services/api/routing/routers/ramRouter';
import { onMounted, ref } from 'vue';

const episodesData = ref([])

onMounted(() => {
  ramRouter.episodes.getAll().then((response) => {
    episodesData.value = response.data.results
  })
})

</script>