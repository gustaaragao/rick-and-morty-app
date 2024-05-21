<template>
  <!-- begin: Dropdown -->
  <div class="flex items-center cursor-pointer 
  border-2 rounded-xl shadow-md pl-2 pr-1" 
  :class="showDropdown ? 'border-purple-400 rounded-b-none' : 'border-gray-400'"
  @click="showDropdown = !showDropdown"
  >
  <!-- begin: Title -->
  <h1 v-if="props.title" 
        class="pr-1 select-none"
        :class="showDropdown ? 'text-purple-400' : 'text-gray-400'"
        > 
        {{ props.title  }}
      </h1>
      <!-- end: Title -->
      <!-- begin: Chevron Icons -->
      <div class="scale-[0.75]"
      :class="showDropdown ? 'text-purple-400' : 'text-gray-400'"
      >
      <i v-if="showDropdown"><ChevronDown /></i>
      <i v-else><ChevronUp /></i>
    </div>
    <!-- end: Chevron Icon -->
  </div>
  <!-- end: Dropdown -->
  <!-- begin: Options Wrapper -->
  <div v-show="showDropdown" class="absolute">
    <!-- begin: Options -->
    <div v-for="(option, index) in options" :key="index">
      {{ option }}
    </div>
    <!-- end: Options -->
  </div>
  <!-- end: Options Wrapper -->
</template>

<script setup>
import { ref } from 'vue';
import { ChevronDown, ChevronUp } from 'lucide-vue-next';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    required: true,
  }
})

const showDropdown = ref(false)

</script>
