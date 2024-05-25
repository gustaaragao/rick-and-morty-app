<template>
  <div class="flex justify-center pt-10">
    <Table
    :rows="mockData"
    />
  </div>
</template>

<script setup>
import Table from '@/components/table/Table.vue'

const mockData = [
  {
    episode: '01',
    name: 'Gustavo',
    air_date: '27/05/2024',
    characters: 'AA',
  },
  {
    episode: '02',
    name: 'Henrique',
    air_date: '01/01/2024',
    characters: 'BB',
  },
  {
    episode: '03',
    name: 'Aragao',
    air_date: '31/12/2024',
    characters: 'CC',
  },
]

</script>