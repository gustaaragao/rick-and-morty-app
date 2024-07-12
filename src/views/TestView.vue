<template>
  <SelectInput
    :options="options"
  >

  </SelectInput>
</template>


<script setup>
import SelectInput from '@/components/inputs/SelectInput.vue';
import { ref } from 'vue';

const options = ref(['gustavo', 'henrique'])

</script>