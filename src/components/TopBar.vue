<template>
  <!--begin: TopBar-->
  <div class="w-full h-20 py-1 px-4 rounded-b-2xl bg-green-400 shadow-md flex justify-between items-center z-50">
    <div class="flex gap-1">
      <!-- begin: LogOut Button -->
      <div class="cursor-pointer pl-2 text-slate-100" @click="logoutUser">
        <LogOut />
      </div>
      <!-- end: LogOut Button -->
      <!-- begin: Profile Button -->
      <div class="cursor-pointer pl-2 text-slate-100" @click="router.push('/profile')">
        <CircleUserRound />
      </div>
      <!-- end: Profile Button -->
    </div>
    <!-- begin: Top Menu -->
    <div class="flex gap-8 text-slate-100 text-xl font-bold underline select-none">
      <a class="cursor-pointer">Characters</a>
      <a class="cursor-pointer">Locations</a>
      <a class="cursor-pointer">Episodes</a>
    </div>
    <!-- end: Top Menu -->
    <!-- begin: ToggleSwitch-->
    <div>
      <ToggleSwitch>
        <template #iconOn>
          <Sun size="16" class="fill-white" />
        </template>
        <template #iconOff>
          <Moon size="16" class="fill-white" />
        </template>
      </ToggleSwitch>
    </div>
    <!-- end: ToggleSwitch-->
  </div>
  <!-- end: TopBar-->
</template>

<script setup>
import ToggleSwitch from '@/components/buttons/ToggleSwitch.vue'
import router from '@/router';
import { Moon, Sun, LogOut, CircleUserRound } from 'lucide-vue-next'

const logoutUser = () => {
  localStorage.clear()
  router.push('/login')
}

</script>
