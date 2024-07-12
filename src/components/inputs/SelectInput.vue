<template>
  <div class="w-fit">
    <!-- begin: Select Input -->
    <div class="flex w-fit bg-purple-300">
      <input
        disabled 
        v-model="props.modelValue"
        class="text-center bg-green-400"
      >
      <i
        v-if="visibleOptions"
        class="cursor-pointer"
        @click="showOptions()"
      >
        <ChevronUp />
      </i>
      <i
        v-else
        class="cursor-pointer"
        @click="showOptions()"
      >
        <ChevronDown />
      </i>
    </div>
    <!-- end: Select Input -->
    <!-- begin: Options -->
    <div
      class="flex flex-col text-center bg-red-400"
      v-show="visibleOptions"
    >
      <label v-for="(option) in props.options">
        <input type="radio" name="aa" id="aaa" :value="option" class="hidden">
        {{ option }}
      </label>
    </div>
    <!-- end: Options -->
  </div>
</template>

<script setup>
import { ChevronDown, ChevronUp } from 'lucide-vue-next';
import { ref } from 'vue';

const props = defineProps({
  modelValue: {
		type: [String, Number],
		default: null,
	},
  options: {
    type: Array,
    required: true
  },
  optionName: {
    type: Array,
    default: []
  }
})

const localValue = ref(props.modelValue);

const visibleOptions = ref(false);

const showOptions = () => {
  visibleOptions.value = !visibleOptions.value
}

</script>