<template>
  <!--begin: TopBar-->
  <div
    class="w-full h-20 py-1 px-8 rounded-b-2xl bg-green-400 shadow-md flex justify-between items-center z-50"
  >
    <div>Olá, Gustavo</div>
    <!--begin: Image-->
    <div class="w-60">
      <slot name="image"></slot>
    </div>
    <!--end: Image-->
    <!--begin: ToggleSwitch-->
    <div>
      <ToggleSwitch>
        <template #iconOn> <Sun size="16" /> </template>
        <template #iconOff> <Moon size="16" /> </template>
      </ToggleSwitch>
    </div>
    <!--end: ToggleSwitch-->
  </div>
  <!--end: TopBar-->
</template>

<script setup>
import ToggleSwitch from './buttons/ToggleSwitch.vue'

import { Moon, Sun } from 'lucide-vue-next'
</script>
