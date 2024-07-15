<template>
  <div
    class="absolute w-full flex flex-col text-center outline outline-gray-200 rounded-b-md"
    v-show="visibleOptions"
  >
    <label
      v-for="(option, index) in props.options"
      :id="index"
      class="cursor-pointer select-none odd:bg-gray-100 even:bg-white last:rounded-b-md"
    >
      <input
        type="radio"
        :id="index"
        :name="props.inputName"
        :value="option"
        class="hidden"
        @input="(event) => { emit('send:event', event) }"
      />
      {{ option }}
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  visibleOptions: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    required:true,
  },
  inputName: {
    type: String,
  },
  optionsPosition: {
    type: String,
    default: 'below'
  }
});

const emit = defineEmits(['send:event'])
</script>
