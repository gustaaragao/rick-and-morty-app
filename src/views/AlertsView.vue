<template>
  <h1 class="text-lg font-black">Toast Notification</h1>
  <div class="flex gap-2 p-5 font-medium">
    <button
      @click="successToastNotification('Successfully submitted!')"
      class="bg-green-400 p-2 rounded"
    >
      Success
    </button>
    <button
      @click="errorToastNotification('Please fix the error!')"
      class="bg-red-400 p-2 rounded"
    >
      Error
    </button>
    <button
      @click="warningToastNotification('Invalid input, check again!')"
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
import { successToastNotification, errorToastNotification, warningToastNotification } from '@/components/alerts/ToastNotification/toastNotification.js'
</script>
