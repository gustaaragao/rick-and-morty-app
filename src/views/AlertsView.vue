<template>
  <!-- begin: Toast Notification -->
  <h1 class="text-lg font-black">Toast Notification</h1>
  <div class="flex gap-2 p-5 font-medium">
    <button
    @click="toastNotificationSucess()"
    class="bg-green-400 p-2 rounded"
    >
      Success
    </button>
    <button
      @click="toastNotificationError('Default error message!')"
      class="bg-red-400 p-2 rounded"
    >
      Error
    </button>
    <button
      @click="toastNotificationWarning('Messagem de warning diferenciada!')"
      class="bg-yellow-400 p-2 rounded"
    >
      Warning
    </button>
  </div>
  <!-- end: Toast Notification -->
  
  <!-- begin: Pop-up Alert -->
  <h1 class="text-lg font-black">Base Alert</h1>
	<div class="flex gap-2 p-5 font-medium">
    <button @click="popUpAlertSuccess()" class="bg-green-400 p-2 rounded">Sucess</button>
		<button @click="popUpAlertError()" class="bg-red-400 p-2 rounded">Error</button>
		<button @click="popUpAlertWarning()" class="bg-yellow-400 p-2 rounded">Warning</button>
	</div>
  <!-- end: Pop-up Alert -->

  <ToastBox></ToastBox>
</template>

<script setup>
import ToastBox from '@/components/alerts/ToastNotification/ToastBox.vue'
import { toastNotificationSucess, toastNotificationError, toastNotificationWarning } from '@/components/alerts/ToastNotification/toastNotification.js'
import { popUpAlertSuccess, popUpAlertError, popUpAlertWarning } from '@/components/alerts/PopupAlert/popUpAlert.js'
</script>
