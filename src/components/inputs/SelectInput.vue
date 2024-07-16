<template>
  <div 
    class="relative w-fit text-gray-800 bg-white outline outline-gray-200 rounded-md"
    :class="[
      visibleOptions && optionsPosition === 'below' ? 'outline-b-0 rounded-b-none' : '',
      visibleOptions && optionsPosition === 'above' ? 'outline-t-0 rounded-t-none' : ''
    ]"
    ref="select"
  >
    <!-- begin: Select Input -->
    <div 
      class="flex w-fit"
      @click="toggleOptions()"
    >
      <input
        disabled 
        v-model="localValue"
        class="w-full text-center pr-4 py-1 bg-white rounded-md"
      >
      <div class="absolute flex pt-0.5 right-1 rounded-md">
        <i
          v-if="visibleOptions"
          class="cursor-pointer"
        >
          <ChevronUp />
        </i>
        <i
          v-else
          class="cursor-pointer "
        >
          <ChevronDown />
        </i>
      </div>
    </div>
    <!-- end: Select Input -->
    <!-- begin: Options -->
    <div 
    v-if="visibleOptions" 
    class="w-full flex flex-col text-center outline outline-gray-200 divide-y divide-gray-200"
    :class="[
      'options-wrapper', optionsPosition,
      optionsPosition === 'below' ? 'rounded-b-md' : 'rounded-t-md' 
    ]"
  >
    <label
      v-for="(option, index) in props.options"
      :id="index"
      class="py-1 cursor-pointer select-none odd:bg-gray-100 even:bg-white"
      :class="optionsPosition === 'below' ? 'last:rounded-b-md' : 'first:rounded-t-md'"
    >
      <input
        type="radio"
        :id="index"
        :name="props.inputName"
        :value="option"
        class="hidden"
        @input="(event) => { handleInputEvent(event) }"
      />
      {{ option }}
    </label>
  </div>
    <!-- end: Options -->
  </div>
</template>

<script setup>
import { ChevronDown, ChevronUp } from 'lucide-vue-next';
import { onMounted, onBeforeUnmount, ref, watch, nextTick } from 'vue';
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
  inputName: {
    type: String,
    default: 'select-input',
  },
});

const emit = defineEmits(['update:model-value']);

const localValue = ref(props.modelValue);
const visibleOptions = ref(false);
const optionsPosition = ref('below');
const select = ref(null);

watch(() => props.modelValue, () => {
  localValue.value = props.modelValue;
})

const showOptions = () => {
  visibleOptions.value = true;
  // O nextTick garante que só vamos executar quando o DOM for totalmente atualizado
  nextTick(() => setOptionsPosition());
};

const hideOptions = () => {
  visibleOptions.value = false;
};

const toggleOptions = () => {
  if (visibleOptions.value) {
    hideOptions();
  } else {
    showOptions();
  }
};

const handleInputEvent = (event) => {
  const value = event.target.value;
  localValue.value = capitalizeFirstLetter(value);
  emit('update:model-value', value);
  hideOptions();
};

const setOptionsPosition = () => {
  const selectRect = select.value.getBoundingClientRect();
  const optionsHeight = selectRect.height * props.options.length;
  const windowHeight = window.innerHeight;

  if (windowHeight - selectRect.bottom < optionsHeight && selectRect.top > optionsHeight) {
    optionsPosition.value = 'above';
  } else {
    optionsPosition.value = 'below';
  }
};

onMounted(() => {
  window.addEventListener('resize', setOptionsPosition);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', setOptionsPosition);
});

watch(visibleOptions, (newValue) => {
  if (newValue) {
    // O nextTick garante que só vamos executar quando o DOM for totalmente atualizado
    nextTick(() => setOptionsPosition());
  }
});
</script>

<style scoped>
.options-wrapper {
  position: absolute;
  z-index: 1000;
}

.options-wrapper.above {
  bottom: 100%;
}

.options-wrapper.below {
  top: 100%;
}
</style>
