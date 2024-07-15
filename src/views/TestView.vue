<template>
  <div class="pt-10 pl-10 mx-20">
    <SelectInput 
      class="w-20"
      :options="options" 
    />
  </div>
  <div class="px-10 py-80">
    <SelectInput :options="options" />
  </div>
</template>

<script setup>
import SelectInput from "@/components/inputs/SelectInput.vue";
import { ref } from "vue";

const options = ref(["1", "2"]);
</script>
