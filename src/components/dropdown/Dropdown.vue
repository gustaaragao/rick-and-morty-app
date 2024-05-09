<template>
  <div class="cursor-pointer">
    <!-- begin: Dropdown Icon -->
    <div @click="showDropdown = !showDropdown">
      <i v-if="showDropdown"><ChevronDown /></i>
      <i v-else><ChevronUp /></i>
    </div>
    <!-- begin: Options Dropdown -->
    <div class="absolute" v-show="showDropdown">
      <div class="grid gap-1 p-1 mt-2 border-2 rounded-md divide-y divide-green-700 border-green-700 bg-green-300">
        <slot></slot>
      </div>
    </div>
    <!-- end: Options Dropdown -->
    <!-- end: Dropdown Icon -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChevronDown, ChevronUp } from 'lucide-vue-next';

const showDropdown = ref(false)

</script>
