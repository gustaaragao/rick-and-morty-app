<template>
  <div class="relative w-fit text-gray-800 bg-white border border-gray-200 rounded-md">
    <!-- begin: Select Input -->
    <div 
      class="flex w-fit"
      @click="handleChevronButton()"
    >
      <input
        disabled 
        v-model="localValue"
        class="text-center bg-white rounded-md"
      >
      <div class="absolute right-1 rounded-md">
        <i
          v-if="visibleOptions"
          class="cursor-pointer"
        >
          <ChevronUp />
        </i>
        <i
          v-else
          class="cursor-pointer"
        >
          <ChevronDown />
        </i>
      </div>
    </div>
    <!-- end: Select Input -->
    <!-- begin: Options -->
    <div
      class="flex flex-col text-center"
      v-show="visibleOptions"
    >
      <label
        v-for="(option, index) in props.options"
        :id="index"
        class="cursor-pointer odd:bg-gray-100 even:bg-white last:rounded-b-md"
      >
        <input 
          type="radio" 
          :id="index" 
          :name="props.inputName" 
          :value="option" 
          class="hidden"
          @input="(event) => handleInput(event)"
        >
        {{ option }}
      </label>
    </div>
    <!-- end: Options -->
  </div>
</template>

<script setup>
import { ChevronDown, ChevronUp } from 'lucide-vue-next';
import { ref } from 'vue';
import { capitalizeFirstLetter } from '@/utils/strings';

const props = defineProps({
  modelValue: {
		type: [String, Number],
		default: null,
	},
  options: {
    type: Array,
    required: true
  },
  inputName: {
    type: String,
    default: 'select-input'
  }
})

const emit = defineEmits(['update:model-value']);

const localValue = ref(props.modelValue);

const visibleOptions = ref(false);

const showOptions = () => {
  visibleOptions.value = true;
}

const hideOptions = () => {
  visibleOptions.value = false;
}

const handleChevronButton = () => {
  if (visibleOptions.value === true) {
    hideOptions();
  } else {
    showOptions();
  }
}

const handleInput = (event) => {
  const value = event.target.value;

  localValue.value = capitalizeFirstLetter(value);
  
  emit('update:model-value', value);

  hideOptions();
}

</script>