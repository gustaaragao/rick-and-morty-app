<template>
  <div class="text-gray-500">
    <h1 class="font-bold">
      {{ title }}
    </h1>
    <div class="" v-for="(option, index) in props.options">
      <input 
        type="radio" 
        :id="props.title.toLowerCase() + 'option' +  index  " 
        :name="title ? title : 'radio'"
        :value="option"
        v-model="localValue"
        @change="updateValue()"
      >
  
      <label
        class="text-dark-blue-950 font-medium select-none cursor-pointer"
        :for="props.title.toLowerCase() + 'option' +  index"
      >
        {{ optionsName[index] ?? option }}
      </label>
    </div>
  </div>


</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
	modelValue: {
		type: [String, Number],
		default: null,
	},
	options: {
		type: Array,
		required: true,
	},
	optionsName: {
		type: Array,
		default: [],
	}
})


const emit = defineEmits(['update:model-value'])

const localValue = ref(props.modelValue)

watch(() => props.modelValue, () => {
	localValue.value = props.modelValue
})

const updateValue = () => {
	emit('update:model-value', localValue.value)
}

</script>

<style scoped>
input {
  display: none;
}

input + label:before {
    cursor: pointer;
    content: '';
    width: 20px;
    height: 20px;

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
    border: 6px solid #064E3B;
}
</style>