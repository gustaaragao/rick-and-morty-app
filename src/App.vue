<template>
  <RouterView />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router'
import router from './router';

onMounted(()=>{
  let user = ref(localStorage.getItem('user-info'))
  if (!user.value) {
    router.push('/login')
  }
})

</script>
