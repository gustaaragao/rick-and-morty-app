<template>
  <!--begin: Login -->
  <form class="relative grid gap-4 pl-4 pt-2 pr-[450px]">
    <h1>Login</h1>
    <!-- begin: User Input -->
    <BaseInput label="User" placeholder="User" focusColor="violet-400" :error="errorMessage" @update:model-value="(value) => {userValue = value}" >
      <template #icon>
        <UserRound />
      </template>
    </BaseInput>
    <!-- end: User Input -->
    <!-- begin: E-mail Input -->
    <BaseInput label="E-mail" placeholder="E-mail" focusColor="violet-400" :error="errorMessage" @update:model-value="(value) => {emailValue = value}" >
      <template #icon>
        <Mail />
      </template>
    </BaseInput>
    <!-- end: User Input -->
    <!-- begin: Password Input -->
    <BaseInput type="password" label="Password" placeholder="Password" focusColor="violet-400" :error="errorMessage" @update:model-value="(value) => {passwordValue = value}">
      <template #icon>
        <KeyRound />
      </template>
    </BaseInput>
    <!-- end: Password Input -->
    <!-- begin: My own Buttons -->
    <div class="flex justify-center gap-5 select-none">
      <BaseButton design="LightButton">
        <template #text> Login </template>
      </BaseButton>
    </div>
    <!-- end: My own Buttons -->
  </form>
  <!--end: Login -->
</template>

<script setup>
import BaseInput from '@/components/inputs/BaseInput.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import { UserRound, KeyRound, Mail } from 'lucide-vue-next'
import { ref, watch } from 'vue';

const errorMessage = ref('');

const userValue = ref('')
const emailValue = ref('')
const passwordValue = ref('')

watch(userValue, () => {
  console.log(userValue.value)
})

watch(emailValue, () => {
  console.log(emailValue.value)
})

watch(passwordValue, () => {
  console.log(passwordValue.value)
})

watch(errorMessage, () => console.log(errorMessage.value))

</script>
