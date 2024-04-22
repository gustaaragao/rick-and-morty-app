<template>
  <div>
    <label v-if="props.label" :style="{ color: defaultColorHex }" class="text-lg">
      {{ props.label }}
    </label>
    <!--begin: Base Input -->
    <div class="border-2 rounded-xl w-fit flex shadow-md mt-1"
      :style="{ 'border-color': defaultColorHex, 'color': defaultColorHex }">
      <!--begin: Icon-->
      <div class="flex items-center justify-center pl-1">
        <i class="scale-[0.8]">
          <slot name="icon"></slot>
        </i>
      </div>
      <!--end: Icon-->
      <!-- begin: Placeholder -->
      <div v-if="props.placeholder" class="absolute z-0 opacity-65 pl-9 pt-1 select-none">
        <span v-show="showPlaceholder">{{ props.placeholder }}</span>
      </div>
      <!-- end: Placeholder -->
      <div class="z-50">
        <input :type="props.type" class="rounded-xl focus:outline-none pl-2 py-1 bg-transparent focus:border-violet-400"
          v-model="inputValue" @input="checkInput()" />
      </div>
    </div>
    <!--end: Base Input -->
  </div>
</template>

<script setup>
import colors from 'tailwindcss/colors'
import { onMounted, ref } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  defaultColor: {
    type: String,
    default: 'gray-400'
  },
  focusColor: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const inputValue = ref('')

const showPlaceholder = ref(true)

const checkInput = () => {
  showPlaceholder.value = inputValue.value.trim() === ''
}

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
})
</script>
