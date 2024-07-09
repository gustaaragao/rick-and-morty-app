<template>
  <button
    :disabled="props.disabled"
    class="flex items-center gap-2 border p-2"
    :class="buttonStyles"
  >
    <i v-if="slots.icon">
      <slot name="icon"></slot>
    </i>
    <span
      v-if="slots.text" 
      class="text-sm pr-1"
    >
      <slot name="text"></slot>
    </span>
  </button>
</template>

<script setup>
import { computed, useSlots } from 'vue'

const props = defineProps({
  designButton: {
    type: String,
    default: 'SolidButton',
    validator: (value) => {
        const POSSIBLE_DESIGNERS = ['SolidButton', 'LightButton'];
        const isValid = POSSIBLE_DESIGNERS.includes(value);
        if (!isValid) {
          console.error('The Button Design definition is outside the standards');
        }
        return isValid;
      },
    default: 'SolidButton'
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  colorButton: {
    type: String,
    default: 'green-400'
  }
})

const slots = useSlots()

const buttonStyles = computed(() => {
  const styles = {
    SolidButton: `bg-${props.colorButton}`,
    LightButton: `bg-purple-300`
  }

  return styles[props.designButton]
})

</script>
