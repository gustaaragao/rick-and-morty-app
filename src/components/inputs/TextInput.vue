<template>
  <div>
    <label v-if="label" :style="{ color: defaultColorHex }" class="text-lg">
      {{ label }}
    </label>
    <!--begin: Text Input-->
    <div
      class="border-2 rounded-xl w-fit flex shadow-md mt-1"
      :style="{ 'border-color': defaultColorHex, color: defaultColorHex }"
    >
      <!--begin: Icon-->
      <div class="flex items-center justify-center pl-1">
        <i class="scale-[0.8]" :style="{ color: defaultColorHex }">
          <slot name="icon"></slot>
        </i>
      </div>
      <!--end: Icon-->
      <input type="text" id="input" class="rounded-xl focus:outline-none pl-2 py-1" />
    </div>
    <!--end: Text Input-->
  </div>
</template>

<script setup>
import colors from 'tailwindcss/colors'
import { onMounted, ref } from 'vue'

const props = defineProps({
  label: {
    type: {
      type: [String, Boolean],
      default: false
    }
  },
  defaultColor: {
    type: String,
    default: 'pink-400'
  },
  focusColor: {
    type: String,
    default: ''
  },
  placeholder: {
    type: [String, Boolean],
    default: false
  }
})

const transformToHex = (defaultColor) => {
  if (defaultColor[0] === '#') {
    return
  }

  const defaultColorArray = defaultColor.split('-')

  const colorName = defaultColorArray[0]

  if (typeof colors[colorName] === 'object') {
    const colorGradient = defaultColorArray[1]

    return colors[colorName][colorGradient]
  }
  return colors[colorName]
}
const defaultColorHex = ref('')
const focusColorHex = ref('')

onMounted(() => {
  defaultColorHex.value = transformToHex(props.defaultColor)
  focusColorHex.value = transformToHex(props.focusColor)

  const inputElement = document.getElementById('input')

  inputElement.classList.add(`placeholder-${props.defaultColor}`)

  console.log('Default: ', defaultColorHex.value)
  console.log('Focus: ', focusColorHex.value)
})
</script>
