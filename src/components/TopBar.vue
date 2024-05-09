<template>
  <!--begin: TopBar-->
  <div class="w-full h-20 py-1 px-4 rounded-b-2xl bg-green-400 shadow-md flex justify-between items-center z-50">
    <!-- begin: Dropdown User -->
    <div class="flex gap-2">
      <Dropdown>
        <button @click="console.log('Profile')"> Profile </button>
        <button @click="console.log('Logout')"> Logout </button>
      </Dropdown>
      <!-- begin: User Image -->
      <!-- <div class="scale-[0.02]">
        <img class="object-scale-down" src="../../db/images/jiji.jpg">
      </div> -->
      <!-- end: User Image -->
      <!-- begin: User Name -->
      <span>Gustavo</span>
      <!-- end: User Name -->
    </div>
    <!-- end: Dropdown User -->
    <!--begin: Logo -->
    <div class="w-60">
      <slot name="image"></slot>
    </div>
    <!--end: Logo-->
    <!--begin: ToggleSwitch-->
    <div>
      <ToggleSwitch>
        <template #iconOn>
          <Sun size="16" />
        </template>
        <template #iconOff>
          <Moon size="16" />
        </template>
      </ToggleSwitch>
    </div>
    <!--end: ToggleSwitch-->
  </div>
  <!--end: TopBar-->
</template>

<script setup>
import ToggleSwitch from './buttons/ToggleSwitch.vue'
import Dropdown from './dropdown/Dropdown.vue'
import { Moon, Sun } from 'lucide-vue-next'

const acessProfileUser = () => {

}

const logoutUser = () => {

}

</script>
