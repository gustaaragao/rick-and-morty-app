<template>
  <!--begin: TopBar-->
  <div class="w-full h-20 py-1 px-4 rounded-b-2xl bg-green-600 dark:bg-purple-500 shadow-md flex justify-between items-center z-40">
    <div class="flex gap-1">
      <!-- begin: LogOut Button -->
      <div class="cursor-pointer pl-3 text-white" @click="logoutUser()">
        <LogOut />
      </div>
      <!-- end: LogOut Button -->
      <!-- begin: Profile Button -->
      <div class="cursor-pointer pl-3 text-white" @click="router.push('/profile')">
        <CircleUserRound />
      </div>
      <!-- end: Profile Button -->
      <!-- begin: Home Button -->
      <div
        v-if="router.currentRoute.value.href !== '/'" 
        class="cursor-pointer pl-3 text-white" 
        @click="router.push('/')">
        <Home />
      </div>
      <!-- end: Home Button -->
    </div>
    <!-- begin: Navbar -->
    <nav 
      v-show="router.currentRoute.value.href !== '/'"
      class="flex gap-8 text-white text-xl font-bold underline select-none"
    >
      <RouterLink to="/characters" class="cursor-pointer">Characters</RouterLink>
      <RouterLink to="/locations" class="cursor-pointer">Locations</RouterLink>
      <RouterLink to="/episodes" class="cursor-pointer">Episodes</RouterLink>
    </nav>
    <!-- end: Navbar -->
    <!-- begin: ToggleSwitch-->
    <div>
      <ToggleSwitch
        :model-value="isDarkMode"
        @update:model-value="(value) => { changeColorTheme(value) }"
      >
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
import { Moon, Sun, LogOut, CircleUserRound, Home } from 'lucide-vue-next'
import { ref } from 'vue';

const logoutUser = () => {
  localStorage.clear()
  router.push('/login')
}

const isDarkMode = ref(localStorage.getItem('color-theme') === 'dark') 

const changeColorTheme = (value) => {
  isDarkMode.value = value;

  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('color-theme', 'dark');
    console.log('dark')
  } else {
    document.documentElement.classList.add('light');
    localStorage.setItem('color-theme', 'light');
    console.log('light')
  }
}


</script>
