<template>
	<div class="grid gap-5 pl-4 pt-4">
		<TextInput :placeholder="'User'">
			<template #icon> <UserRound /> </template>
		</TextInput>
		<TextInput type="password" :placeholder="'Password'">
			<template #icon> <KeyRound /> </template>
		</TextInput>
	</div>
</template>

<script setup>
import TextInput from '@/components/inputs/TextInput.vue';
import { UserRound } from 'lucide-vue-next';
import { KeyRound } from 'lucide-vue-next';
</script>