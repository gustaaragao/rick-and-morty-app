<template>
  <div class="grid gap-5 pl-4 pt-4">
    <BaseInput label="User" placeholder="User" focusColor="violet-400">
      <template #icon>
        <UserRound />
      </template>
    </BaseInput>
    <BaseInput type="password" focusColor="violet-400">
      <template #icon>
        <KeyRound />
      </template>
    </BaseInput>
  </div>
</template>

<script setup>
import BaseInput from '@/components/inputs/BaseInput.vue'
import { UserRound } from 'lucide-vue-next'
import { KeyRound } from 'lucide-vue-next'
</script>
