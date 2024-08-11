<template>
  <!-- begin: NavBar -->
  <NavBar
    v-if="router.currentRoute.value.href != '/login' && router.currentRoute.value.href != '/register'">
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
  const user = ref(localStorage.getItem('user-info'))
  if (!user.value) {
    router.push('/login')
  }
})

</script>
