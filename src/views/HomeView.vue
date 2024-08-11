<template>
  <div class="flex justify-center">
    <div class="scale-50">
      <img src="@/assets/rick_and_morty_logo.png" alt="Rick and Morty Logo">
    </div>
  </div>
  <div 
      class="flex justify-center gap-14 text-3xl font-bold underline select-none"
    >
      <RouterLink to="/characters" class="cursor-pointer">Characters</RouterLink>
      <RouterLink to="/locations" class="cursor-pointer">Locations</RouterLink>
      <RouterLink to="/episodes" class="cursor-pointer">Episodes</RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>