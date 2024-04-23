<template>
  <div>
    <button
      ref="buttonElement"
      class="flex flex-row items-center gap-0.5 select-none border-2 rounded-md px-2 py-0.5"
    >
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
import { transformToHexColor } from '@/utils/transformToHexColor.js'

const colorButtonHex = ref('')
const colorTextHex = ref('')

const buttonElement = ref(null)

const props = defineProps({
  type: {
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
  }
})

const addEffectHover = () => {
  if (props.type === 'LightButton') {
    buttonElement.value.addEventListener('mouseover', () => {
			buttonElement.value.style.borderColor = 'pink'
			buttonElement.value.style.color = 'pink'
    })
    buttonElement.value.addEventListener('mouseout', () => {
			buttonElement.value.style.borderColor = colorButtonHex.value
			buttonElement.value.style.color = colorButtonHex.value
    })
  } else {
    buttonElement.value.addEventListener('mouseover', () => {
			buttonElement.value.style.borderColor = 'pink'
			buttonElement.value.style.backgroundColor = 'pink'
    })
    buttonElement.value.addEventListener('mouseout', () => {
			buttonElement.value.style.borderColor = colorButtonHex.value
			buttonElement.value.style.backgroundColor = colorButtonHex.value
    })
  }
}

onMounted(() => {
  colorButtonHex.value = transformToHexColor(props.colorButton)
  colorTextHex.value = transformToHexColor(props.colorText)

  buttonElement.value.style.borderColor = colorButtonHex.value
  if (props.type === 'LightButton') {
    buttonElement.value.style.color = colorButtonHex.value
  } else {
    buttonElement.value.style.backgroundColor = colorButtonHex.value
    buttonElement.value.style.color = colorTextHex.value
  }

  addEffectHover()
})
</script>
