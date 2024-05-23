<template>
  <div class="pt-8 pl-8">
    <RadioInput title="Titulo1" :options="optionsRadio" @update:model-value="(value) => {selectedOption = value}"></RadioInput>
    {{ selectedOption }}
  </div>

  <div class="pt-8 pl-8">
    <RadioInput title="Titulo2" :options="optionsRadio2" @update:model-value="(value) => {selectedOption2 = value}" class="flex gap-4"></RadioInput>
    {{ selectedOption2 }}
  </div>
</template>

<script setup>
// TODO: MUDAR DE SELECT PARA MULTISELECT e desativar o RADIO
// import SelectInput from '@/components/inputs/select/Select.vue'
// import LabelSelectInput from '@/components/inputs/select/LabelSelect.vue'

import { ref } from 'vue'

import RadioInput from '@/components/inputs/radio/RadioInput.vue'

const optionsRadio = ref(['A', 'B', 'C']);
const optionsRadio2 = ref(['A', 'E', 'F']);

const selectedOption = ref('');
const selectedOption2 = ref('');

</script>