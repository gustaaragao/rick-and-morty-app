<template>
  <!--begin: Background-->
  <div class="w-14 h-8 p-1 flex items-center rounded-full cursor-pointer transition-all duration-500"
    :class="modelValue ? props.onColorBackground : props.offColorBackground" @click="updateModelValue()">
    <!--begin: Circle-->
    <div
      class="w-6 h-6 bg-white rounded-full shadow-lg flex justify-center items-center transition-all duration-500 transform "
      :class="modelValue ? `translate-x-6 ${props.onColorCircle}` : props.offColorCircle">
      <!-- begin: Icons -->
      <div class="text-white">
        <i v-if="!modelValue">
          <slot name="iconOn"></slot>
        </i>
        <i v-else>
          <slot name="iconOff"></slot>
        </i>
      </div>
      <!-- end: Icons -->
    </div>
    <!--begin: Circle-->
  </div>
  <!--end: Background-->
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  offColorCircle: {
    type: String,
    default: 'bg-amber-400',
  },
  offColorBackground: {
    type: String,
    default: 'bg-yellow-100',
  },
  onColorCircle: {
    type: String,
    default: 'bg-blue-800',
  },
  onColorBackground: {
    type: String,
    default: 'bg-blue-200',
  },
})

const modelValue = ref(false)

const updateModelValue = () => {
  modelValue.value = !modelValue.value
}
</script>
