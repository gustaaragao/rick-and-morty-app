<template>
  <div>
    <button ref="buttonElement" 
            :disabled="props.disabled"
            class="flex flex-row items-center gap-0.5 select-none border-2 rounded-full px-2 py-1 disabled:cursor-not-allowed">
      <i class="scale-[0.8]">
        <slot name="icon"></slot>
      </i>
      <span class="text-sm">
        <slot name="text"></slot>
      </span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { transformTailwindColorToHex } from '@/utils/transformTailwindColorToHex.js'

const props = defineProps({
  design: {
    type: String,
    default: 'SolidButton'
  },
  colorButton: {
    type: String,
    default: 'green-400'
  },
  colorText: {
    type: String,
    default: 'white'
  },
  colorHoverEffect: {
    type: String,
    default: 'green-500',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const colorButtonHex = ref('')
const colorTextHex = ref('')
const colorHoverEffectHex = ref('')

const buttonElement = ref(null)

const addEffectHover = () => {
  if (props.design === 'LightButton') {
    buttonElement.value.addEventListener('mouseover', () => {
      buttonElement.value.style.borderColor = colorHoverEffectHex.value
      buttonElement.value.style.color = colorHoverEffectHex.value
    })
    buttonElement.value.addEventListener('mouseout', () => {
      buttonElement.value.style.borderColor = colorButtonHex.value
      buttonElement.value.style.color = colorButtonHex.value
    })
  } else {
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
  if (props.design === 'LightButton') {
    buttonElement.value.style.color = colorButtonHex.value
  } else {
    buttonElement.value.style.backgroundColor = colorButtonHex.value
    buttonElement.value.style.color = colorTextHex.value
  }

  addEffectHover()
})
</script>
