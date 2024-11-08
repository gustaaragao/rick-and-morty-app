<template>
  <div class="px-4">
    <label
      v-for="(option, index) in options"
      class="flex items-center gap-x-1"
      :id="index"
    >
      <input
        type="radio"
        :id="index"
        :value="option"
        :name="inputName"
        v-model="localValue"
        @change="updateValue()"
      />
      {{ optionsName[index] ?? capitalizeFirstLetter(option) }}
    </label>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { capitalizeFirstLetter } from '@/utils/strings';

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
	},
  inputName: {
    type: String,
    default: 'radio-input'
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
label, input[type="radio"] {
  cursor: pointer;
}

label {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.1;
  @apply text-gray-800;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;
}

input[type="radio"] {
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  /* Remove most all native input styles */
  appearance: none;
  /* For iOS < 15 */
  background-color: #fff;
  /* Not removed via appearance */
  margin: 0;

  @apply w-[1.2em] h-[1.2em] border-[0.15em] border-gray-400 rounded-full;
  transform: translateY(-0.075em);

  @apply grid place-content-center;
}

input[type="radio"]::before {
  content: "";
  width: 0.7em;
  height: 0.7em;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 0.5em 0.5em rgb(34, 197, 94);
}

input[type="radio"]:checked::before {
  transform: scale(1);
}
</style>