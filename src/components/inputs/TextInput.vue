<template>
  <div>
    <label v-if="label">
      {{ label }}
    </label>
    <!--`placeholder-${finalColor}`-->
    <div class="border-2 rounded-xl w-fit flex shadow-md" :class="`border-${defaultColor}`">
      <!--begin: Icon-->
      <div class="flex items-center justify-center pl-1">
        <i class="scale-[0.8]" :class="`text-${defaultColor}`">
          <slot name="icon"></slot>
        </i>
      </div>
      <!--end: Icon-->
      <!--begin: Text Input-->
      <input
        type="text"
        class="rounded-xl focus:outline-none pl-2 py-1"
        :class="`placeholder-${defaultColor}`"
        v-bind="$attrs"
        @focus="(event) => changeColorInput(event.target, focusColor, defaultColor)"
        @blur="(event) => changeColorInput(event.target, defaultColor, focusColor)"
      />
      <!--end: Text Input-->
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: {
      type: [String, Boolean],
      default: false
    }
  },
  defaultColor: {
    type: String,
    default: 'gray-400'
  },
  focusColor: {
    type: [String, Boolean],
    default: false
  }
})

const changeColorInput = (inputElement, finalColor, initialColor) => {
  // Check if it has focusColor
  if (props.focusColor) {
    let parentDiv = inputElement.parentElement
    let iconElement = parentDiv.querySelector('div > i')

    // Placerholder
    inputElement.classList.add(`placeholder-${finalColor}`)
    inputElement.classList.remove(`placeholder-${initialColor}`)
    // Border
    parentDiv.classList.add(`border-${finalColor}`)
    parentDiv.classList.remove(`border-${initialColor}`)
    // Icon
    iconElement.classList.add(`text-${finalColor}`)
    iconElement.classList.remove(`text-${initialColor}`)
  }
}
</script>
