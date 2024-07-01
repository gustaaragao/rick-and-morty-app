<template>
  <div class="px-96 pt-32">
    <Table 
      :columns="['a', 'b']"
      :data="[{'a': 'gustavo', 'b': 'henrique'}, {'a': 'aragao', 'b': 'silva'}]"
    >
      <template #search>
        <SearchTable 
          :search-options="['a', 'b']"
          @send:search-object="(obj) => console.log(obj)"
        />
      </template>
    </Table>
  </div>
</template>

<script setup>
import Table from '@/components/table/Table.vue';
import SearchTable from '@/components/table/handler/SearchTable.vue';


</script>