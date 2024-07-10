<template>
  <!--begin: TopBar-->
  <div class="w-full h-20 py-1 px-4 rounded-b-2xl bg-green-600 shadow-md flex justify-between items-center z-40">
    <div class="flex gap-1">
      <!-- begin: LogOut Button -->
      <div class="cursor-pointer pl-2 text-white" @click="logoutUser">
        <LogOut />
      </div>
      <!-- end: LogOut Button -->
      <!-- begin: Profile Button -->
      <div class="cursor-pointer pl-2 text-white" @click="router.push('/profile')">
        <CircleUserRound />
      </div>
      <!-- end: Profile Button -->
    </div>
    <!-- begin: Navbar -->
    <nav class="flex gap-8 text-white text-xl font-bold underline select-none">
      <RouterLink to="/characters" class="cursor-pointer">Characters</RouterLink>
      <RouterLink to="/locations" class="cursor-pointer">Locations</RouterLink>
      <RouterLink to="/episodes" class="cursor-pointer">Episodes</RouterLink>
    </nav>
    <!-- end: Navbar -->
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
import { RouterLink } from 'vue-router';
import router from '@/router';
import { Moon, Sun, LogOut, CircleUserRound } from 'lucide-vue-next'

const logoutUser = () => {
  localStorage.clear()
  router.push('/login')
}

</script>
