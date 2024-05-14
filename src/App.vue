<template>
  <!-- begin: NavBar -->
  <NavBar class="sticky top-0"
    v-if="router.currentRoute.value.href != '/login' && router.currentRoute.value.href != '/register'">
    <template #image>
      <img src="@\assets\rick_and_morty_logo.png" />
    </template>
  </NavBar>
  <!-- end: NavBar -->

  <RouterView />

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import router from './router';

import NavBar from './components/NavBar.vue';

onMounted(() => {
  let user = ref(localStorage.getItem('user-info'))
  if (!user.value) {
    router.push('/login')
  }
})

</script>
