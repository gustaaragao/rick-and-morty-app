<template>
  <!--begin: Login -->
  <form class="relative grid gap-4 pl-4 pt-2 pr-[450px]">
    <h1>Login</h1>
    <!-- begin: User Input -->
    <BaseInput label="User" placeholder="User" focusColor="violet-400" :error="errorMessage">
      <template #icon>
        <UserRound />
      </template>
    </BaseInput>
    <!-- end: User Input -->
    <!-- begin: Password Input -->
    <BaseInput type="password" label="Password" placeholder="Password" focusColor="violet-400" :error="errorMessage">
      <template #icon>
        <KeyRound />
      </template>
    </BaseInput>
    <!-- end: Password Input -->
    <!-- begin: My own Buttons -->
    <div class="flex justify-center gap-5 select-none">
      <BaseButton type="LightButton">
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
import { UserRound, KeyRound } from 'lucide-vue-next'
import { ref, watch } from 'vue';

const errorMessage = ref('');

watch(errorMessage, () => console.log(errorMessage.value))

</script>
