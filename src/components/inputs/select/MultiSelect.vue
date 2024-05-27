<template>
  <div ref="multiSelectRef" 
       class="relative select-none rounded-xl shadow-md"
       :class="showOptions ? 'rounded-b-none shadow-none' : ''"
  >
    <!-- begin: MultiSelect -->
    <div class="flex items-center cursor-pointer h-full pl-2 pr-1
                border-2 border-gray-400 rounded-xl bg-white"
         :class="showOptions ? 'rounded-b-none' : ''"
         @click="showOptions = !showOptions"
    >
      <!-- begin: Icon -->
      <i v-if="$slots.icon" class="scale-[0.75] text-gray-400">
          <slot name="icon"></slot>
      </i>
      <!-- end: Icon -->
      <!-- begin: Title -->
      <h1 v-if="props.title" class="pr-1 text-gray-400">
        {{ props.title }}
      </h1>
      <!-- end: Title -->
      <!-- begin: Chevron Icons -->
      <div class="scale-[0.75] text-gray-400">
        <i v-show="showOptions">
          <ChevronDown />
        </i>
        <i v-show="!showOptions">
          <ChevronUp />
        </i>
      </div>
      <!-- end: Chevron Icon -->
    </div>
    <!-- end: MultiSelect -->
    <!-- begin: Options Wrapper -->
    <div v-show="showOptions" 
         class="absolute w-full border-x-2 border-b-2 rounded-b-xl border-gray-400 divide-y-2 divide-gray-400 z-10"
         :class="showOptions ? 'shadow-md' : ''"
    >
      <!-- begin: Options -->
      <div v-for="(option, index) in options" 
           :key="index"
           class="flex justify-center py-1 text-gray-400 cursor-pointer bg-white last:rounded-b-xl"
      >
        <input type="checkbox"
               :id="props.title.toLowerCase() + 'Option' +  index"
               :value="option"
               v-model="selectedOptions"
        >
        <label :for="props.title.toLocaleLowerCase() + 'Option' + index"
               class="cursor-pointer"
        >
          {{ option }}
        </label>
      </div>
      <!-- end: Options -->
    </div>
    <!-- end: Options Wrapper -->
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { ChevronDown, ChevronUp } from 'lucide-vue-next';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:model-value'])

const selectedOptions = ref([])

watch(selectedOptions, () => {
  emit('update:model-value', selectedOptions.value)
})

const multiSelectRef = ref(null)

const showOptions = ref(false)

const hideOptions = (element) => {
  if (!multiSelectRef.value.contains(element.target)) {
    showOptions.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', hideOptions)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', hideOptions)
})
</script>

<style scoped>

input {
  display: none;
}

input + label::before {
  content: '';
  width: 15px;
  height: 15px;

  background-color: white;
  border-radius: 50%;
  border: 1.75px solid rgb(156 163 175);

  display: inline-block;
  vertical-align: middle;
  margin-right: 6px;
}

input:checked + label:before {
  background-color: white;
  box-sizing: border-box;
  border: 4px solid rgb(74 222 128);
}

</style>