<template>
  <label
    v-for="option in options"
    :for="option"
    :key="option"
  >
    <input
      type="radio"
      :value="option"
      :id="option"
      name="radio-input"
      v-model="localValue"
      @change="updateValue()"
    />
    {{ option }}
  </label>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
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
label, input {
  @apply cursor-pointer
}

</style>