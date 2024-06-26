<template>
  <div class="flex flex-col w-full">
    <!-- begin: Header -->
    <label class="text-dark-blue-950 font-medium pb-1.5">
      <slot name="header"></slot>
    </label>
    <!-- end: Header -->
    <!-- begin: Input -->
    <div class="flex">
      <!-- begin: Icon -->
      <div 
          v-if="hasIcon()" 
          class="flex items-center justify-center px-2 bg-gray-100 
                 border-l border-y border-gray-200 rounded-l-md"
      >
        <i class="text-gray-400 scale-[0.9]">
          <slot name="icon"></slot>
        </i>
      </div>
      <!-- end: Icon -->
      <input 
        type="text"
        :class="hasIcon() ? 'rounded-r-md' : 'rounded-md'"
        :value="modelValue"
        class="py-2 pl-2 focus:outline-none w-full disabled:cursor-not-allowed
               border border-gray-200 text-dark-blue-950"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
        @input="(event)=>{
          emit('update:model-value', event.target.value)
        }"
      >
    </div>
    <!-- end: Input -->
  </div>
</template>

<script setup>
import {useSlots } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:model-value'])

const hasIcon = () => {
  const slots = useSlots();

  return !!slots['icon'];
}
</script>