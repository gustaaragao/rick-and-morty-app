<template>
  Profile View
</template>

<script setup>
import { onMounted } from 'vue';
import router from '@/router';

onMounted(()=>{
  let user = ref(localStorage.getItem('user-info'))
  if (!user.value) {
    router.push('/login')
  }
})

</script>