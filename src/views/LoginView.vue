<template>
  <div class="relative grid gap-4 pl-4 pt-2 pr-[450px]">
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
    <div class="flex justify-center gap-5">
      <button class="border-2 rounded-md px-2" @click="errorMessage = 'Error message'">
        Error
      </button>
      <button class="border-2 rounded-md px-2" @click="errorMessage = ''">
        Clear
      </button>
    </div>
  </div>
</template>

<script setup>
import BaseInput from '@/components/inputs/BaseInput.vue'
import { UserRound } from 'lucide-vue-next'
import { KeyRound } from 'lucide-vue-next'
import { ref, watch } from 'vue';

const errorMessage = ref('');

watch(errorMessage, () => console.log(errorMessage.value))

</script>
