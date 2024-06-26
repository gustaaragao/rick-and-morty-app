<template>
  <div class="text-gray-500">
    <h1 class="font-bold">
      {{ title }}
    </h1>
    <div v-for="(option, index) in props.options">
      <input 
        type="radio"
        :name="title ? title : 'radio'"
        :id="props.title.toLowerCase() + 'option' +  index"
        :value="option"
        @input="(event) => {
          emit('update:model-value', event.target.value)
        }"
      >
      <label class="cursor-pointer"
             :for="props.title.toLowerCase() + 'option' +  index"
      >
        {{ processLabel(option) }}
      </label>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:model-value'])

const processLabel = (str) => {
  const strWithoutUnderscore = str.replace('_', ' ')
  const strCapitalize = strWithoutUnderscore.charAt(0).toUpperCase() + strWithoutUnderscore.slice(1)
  
  return strCapitalize
}

</script>

<style scoped>
input {
  display: none;
}

input + label:before {
    cursor: pointer;
    content: '';
    width: 14px;
    height: 14px;

    background-color: white;
    border-radius: 50%;
    border: 1.75px solid rgb(156 163 175);

    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
    margin-bottom: 4px;
}

input:checked + label:before {
    background-color: white;
    box-sizing: border-box;
    border: 4px solid #064E3B;
}

</style>