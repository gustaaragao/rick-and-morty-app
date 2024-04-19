<template>
  <!--begin: Background-->
  <div
    class="w-14 h-8 p-1 flex items-center rounded-full cursor-pointer transition-all duration-500"
    :class="modelValue ? 'bg-gray-300' : 'bg-orange-500'"
    @click="updateModelValue()"
  >
    <!--begin: Circle-->
    <div
      class="w-6 h-6 bg-white rounded-full shadow-lg flex justify-center items-center transition-all duration-500 transform"
      :class="modelValue ? 'translate-x-6' : ''"
    >
      <i v-if="!modelValue">
        <slot name="iconOn"></slot>
      </i>
      <i v-else>
        <slot name="iconOff"></slot>
      </i>
    </div>
    <!--begin: Circle-->
  </div>
  <!--end: Background-->
</template>

<script setup>
import { ref } from 'vue'

const modelValue = ref(false)

const updateModelValue = () => {
  modelValue.value = !modelValue.value
}
</script>
