<template>
  <div class="p-10">
    <SelectInput
      :options="options"
    >
    </SelectInput>
  </div>

</template>


<script setup>
import SelectInput from '@/components/inputs/SelectInput.vue';
import { ref } from 'vue';

const options = ref(['1', '2'])

</script>