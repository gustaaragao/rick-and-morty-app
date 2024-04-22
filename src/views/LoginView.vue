<template>
  <div class="grid gap-5 pl-4 pt-4">
    <TextInput label="User" placeholder="User" focusColor="violet-400">
      <template #icon>
        <UserRound />
      </template>
    </TextInput>
    <TextInput type="password" label="Password" placeholder="Password" focusColor="violet-400">
      <template #icon>
        <KeyRound />
      </template>
    </TextInput>
  </div>
</template>

<script setup>
import TextInput from '@/components/inputs/TextInput.vue'
import { UserRound } from 'lucide-vue-next'
import { KeyRound } from 'lucide-vue-next'
</script>
