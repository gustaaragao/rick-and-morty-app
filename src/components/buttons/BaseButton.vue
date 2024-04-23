<template>
	<div>
		<button class="flex flex-row items-center gap-0.5 select-none border-2 rounded-md px-2 py-0.5">
			<i class="scale-[0.8]">
				<slot name="icon"></slot>
			</i>
			<span class="text-sm">
				<slot name="text"></slot>
			</span>
		</button>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { transformToHexColor } from '@/utils/transformToHexColor.js'

const colorButtonHex = ref('');
const colorTextHex = ref('');

onMounted(()=>{
	colorButtonHex.value = transformToHexColor(props.colorButton)
	colorTextHex.value = transformToHexColor(props.colorText)
})

const props = defineProps({
	colorButton: {
		type: String,
		default: ''
	},
	colorText: {
		type: String,
		default: ''
	}
})
</script>