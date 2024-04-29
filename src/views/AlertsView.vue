<template>
  <h1 class="text-lg font-black">Toast Notification</h1>
  <div class="flex gap-2 p-5 font-medium">
    <button
      @click="toastNotification('Successfully submitted! (Success)')"
      class="bg-green-400 p-2 rounded"
    >
      Success
    </button>
    <button
      @click="toastNotification('Please fix the error! (Error)')"
      class="bg-red-400 p-2 rounded"
    >
      Error
    </button>
    <button
      @click="toastNotification('Invalid input, check again! (Warning)')"
      class="bg-yellow-400 p-2 rounded"
    >
      Warning
    </button>
  </div>

  <!-- <h1 class="text-lg font-black">Base Alert</h1>
	<div class="flex gap-2 p-5 font-medium">
		<button class="bg-green-400 p-2 rounded">Sucess</button>
		<button class="bg-red-400 p-2 rounded">Error</button>
		<button class="bg-yellow-400 p-2 rounded">Warning</button>
	</div> -->

  <ToastBox></ToastBox>
</template>

<script setup>
import ToastBox from '@/components/alerts/ToastNotification/ToastBox.vue'
import { toastNotification } from '@/components/alerts/ToastNotification/toastNotification.js'
</script>
