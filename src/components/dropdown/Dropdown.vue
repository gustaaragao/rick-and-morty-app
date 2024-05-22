<template>
  <div ref="dropdownRef" class="relative select-none">
    <!-- begin: Dropdown -->
    <div class="flex items-center cursor-pointer h-full pl-2 pr-1
                border-2 border-gray-400 rounded-xl shadow-md"
         :class="showDropdown ? 'rounded-b-none' : ''"
         @click="showDropdown = !showDropdown"
    >
      <!-- begin: Icon -->
      <i v-if="$slots.icon" class="scale-[0.75] text-gray-400">
          <slot name="icon"></slot>
      </i>
      <!-- end: Icon -->
      <!-- begin: Title -->
      <h1 v-if="props.title" class="pr-1 text-gray-400">
        {{ props.title }}
      </h1>
      <!-- end: Title -->
      <!-- begin: Chevron Icons -->
      <div class="scale-[0.75] text-gray-400">
        <i v-show="showDropdown" class="z-0">
          <ChevronDown />
        </i>
        <i v-show=!showDropdown>
          <ChevronUp />
        </i>
      </div>
      <!-- end: Chevron Icon -->
    </div>
    <!-- end: Dropdown -->
    <!-- begin: Options Wrapper -->
    <div v-show="showDropdown" 
         class="absolute w-full border-x-2 border-b-2 rounded-b-xl border-gray-400 divide-y-2 divide-gray-400"
    >
      <!-- begin: Options -->
      <div v-for="(option, index) in options" 
           :key="index"
           class="flex justify-center py-1 text-gray-400"
      >
        <input type="radio" 
               :id="index"
               name="radio"
               class="mr-1"
        >
        <label :for="index"
               class="cursor-pointer"
        >
          {{ option }}
        </label>
      </div>
      <!-- end: Options -->
    </div>
    <!-- end: Options Wrapper -->
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { ChevronDown, ChevronUp } from 'lucide-vue-next';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    required: true,
  },
  type: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:model-value'])

const dropdownRef = ref(null)

const showDropdown = ref(false)


const hideOptions = (element) => {
  if (!dropdownRef.value.contains(element.target)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', hideOptions)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', hideOptions)
})
</script>

<style scoped>

</style>