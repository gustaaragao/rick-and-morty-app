<template>
  <div 
    class="w-fit" 
    ref="select"
  >
    <div 
      class="relative w-fit text-gray-800 bg-white outline outline-gray-200 rounded-md"
      :class="visibleOptions ? 'outline-b-0 rounded-b-none' : ''"
    >
      <!-- begin: Select Input -->
      <div 
        class="flex w-fit"
        @click="toggleOptions()"
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
      <OptionsWrapper
        :visible-options="visibleOptions"
        :input-name="props.inputName"
        :options="props.options"
        @send:event="(event) => { handleInputEvent(event) }"
      />
      <!-- end: Options -->
    </div>
  </div>
</template>

<script setup>
import { ChevronDown, ChevronUp } from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import { capitalizeFirstLetter } from '@/utils/strings';
import OptionsWrapper from './handler/OptionsWrapper.vue';

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

const toggleOptions = () => {
  if (visibleOptions.value === true) {
    hideOptions();
  } else {
    showOptions();
  }
}

const handleInputEvent = (event) => {
  const value = event.target.value;

  localValue.value = capitalizeFirstLetter(value);
  
  emit('update:model-value', value);

  hideOptions();
}

const optionsPosition = ref('below');

const select = ref(null);

const setOptionsPosition = (select) => {
  const selectRect = computed(() => select.value.getBoundingClientRect());

  const selectHeight = selectRect.value.height;

  const optionsHeight = selectHeight * props.options?.length;

  const windowHeight = window.innerHeight;

  const optionsFit = ref(selectRect.value.bottom + optionsHeight < windowHeight);

  optionsPosition.value = optionsFit.value ? 'below' : 'above'
}

onMounted(() => {
  setOptionsPosition(select);
})

</script>