<template>
  <div class="flex flex-col gap-8 w-[200px] pt-8 pl-8">
    <MultiSelect title='Teste1' :options="options" @update:model-value="selectedOptions"></MultiSelect>
    <LabelMultiSelect :selected-options="selectedOptions"></LabelMultiSelect>
    
    <MultiSelect title='Teste2' :options="options" @update:model-value="selectedOptions2"></MultiSelect>
    <LabelMultiSelect :selected-options="selectedOptions2"></LabelMultiSelect>
  </div>
</template>

<script setup>
// TODO: MUDAR DE SELECT PARA MULTISELECT e desativar o RADIO
import MultiSelect from '@/components/inputs/select/MultiSelect.vue'
import LabelMultiSelect from '@/components/inputs/select/LabelMultiSelect.vue'

import { ref, watch } from 'vue'

const options = ref(['A', 'B', 'C'])

const selectedOptions = ref([])
const selectedOptions2 = ref([])

watch(selectedOptions, () => {
  console.log(selectedOptions.value);
})

watch(selectedOptions2, () => {
  console.log(selectedOptions2.value);
})

</script>