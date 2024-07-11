<template>
  <button
    ref="buttonElement"
    :disabled="props.disabled"
    class="flex items-center gap-2 p-2 disabled:cursor-not-allowed disabled:opacity-65"
  >
    <i v-if="slots.icon">
      <slot name="icon"></slot>
    </i>
    <span v-if="slots.text" class="text-sm font-medium">
      <slot name="text"></slot>
    </span>
  </button>
</template>

<script setup>
import { ref, onMounted, useSlots } from 'vue'
import { transformTailwindColorToHex } from '@/utils/transformTailwindColorToHex.js'

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
  colorButton: {
    type: String,
    default: 'green-600'
  },
  colorText: {
    type: String,
    default: 'white'
  },
  colorHoverEffect: {
    type: String,
    default: 'green-700',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const slots = useSlots()

const colorButtonHex = ref('')
const colorTextHex = ref('')
const colorHoverEffectHex = ref('')

const buttonElement = ref(null)

const addEffectHover = () => {
  if (props.designButton === 'LightButton') {
    buttonElement.value.addEventListener('mouseover', () => {
      buttonElement.value.style.borderColor = colorHoverEffectHex.value
      buttonElement.value.style.color = colorHoverEffectHex.value
    })
    buttonElement.value.addEventListener('mouseout', () => {
      buttonElement.value.style.borderColor = colorButtonHex.value
      buttonElement.value.style.color = colorButtonHex.value
    })
  } else if (props.designButton == 'SolidButton') {
    buttonElement.value.addEventListener('mouseover', () => {
      buttonElement.value.style.borderColor = colorHoverEffectHex.value
      buttonElement.value.style.backgroundColor = colorHoverEffectHex.value
    })
    buttonElement.value.addEventListener('mouseout', () => {
      buttonElement.value.style.borderColor = colorButtonHex.value
      buttonElement.value.style.backgroundColor = colorButtonHex.value
    })
  }
}

onMounted(() => {
  colorButtonHex.value = transformTailwindColorToHex(props.colorButton)
  colorTextHex.value = transformTailwindColorToHex(props.colorText)
  colorHoverEffectHex.value = transformTailwindColorToHex(props.colorHoverEffect)

  buttonElement.value.style.borderColor = colorButtonHex.value
  if (props.designButton === 'LightButton') {
    console.log('ligh')
    buttonElement.value.style.color = colorButtonHex.value
  } else if (props.designButton == 'SolidButton') {
    buttonElement.value.style.backgroundColor = colorButtonHex.value
    buttonElement.value.style.color = colorTextHex.value
  }

  addEffectHover()
})

</script>
