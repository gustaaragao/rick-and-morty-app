<template>
  <!--begin: Background-->
  <div 
    class="w-14 h-8 p-1 flex items-center rounded-full cursor-pointer transition-all duration-500"
    :class="switchValue ? props.onColorBackground : props.offColorBackground" 
    @click="() => updateSwitchValue()"
  >
    <!--begin: Circle-->
    <div
      class="w-6 h-6 rounded-full shadow-lg flex justify-center items-center transition-all duration-500 transform "
      :class="switchValue ? `translate-x-6 ${props.onColorCircle}` : props.offColorCircle">
      <!-- begin: Icons -->
      <div class="text-white">
        <i v-if="!switchValue">
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
import { ref, watch } from 'vue'

const props = defineProps({
  offColorCircle: {
    type: String,
    default: 'bg-amber-400',
  },
  offColorBackground: {
    type: String,
    default: 'bg-yellow-200',
  },
  onColorCircle: {
    type: String,
    default: 'bg-blue-600',
  },
  onColorBackground: {
    type: String,
    default: 'bg-blue-300',
  },
  modelValue: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['update:model-value']);

const switchValue = ref(props.modelValue);

watch(() => props.modelValue, () => {
  switchValue.value = props.modelValue
})

const updateSwitchValue = () => {
  switchValue.value = !switchValue.value

  emit('update:model-value', switchValue.value)
}
</script>
