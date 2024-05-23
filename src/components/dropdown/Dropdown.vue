<template>
  <div ref="dropdownRef" 
       class="relative select-none rounded-xl shadow-md"
       :class="showDropdown ? 'rounded-b-none shadow-none' : ''"
  >
    <!-- begin: Dropdown -->
    <div class="flex items-center cursor-pointer h-full pl-2 pr-1
                border-2 border-gray-400 rounded-xl"
         :class="showDropdown ? 'rounded-b-none' : ''"
         @click="showDropdown = !showDropdown"
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
        <i v-show="showDropdown" class="z-0">
          <ChevronDown />
        </i>
        <i v-show=!showDropdown>
          <ChevronUp />
        </i>
      </div>
      <!-- end: Chevron Icon -->
    </div>
    <!-- end: Dropdown -->
    <!-- begin: Options Wrapper -->
    <div v-show="showDropdown" 
         class="absolute w-full border-x-2 border-b-2 rounded-b-xl border-gray-400 divide-y-2 divide-gray-400"
         :class="showDropdown ? 'shadow-md' : ''"
    >
      <!-- begin: Options -->
      <div v-for="(option, index) in options" 
           :key="index"
           class="flex justify-center py-1 text-gray-400 cursor-pointer"
      >
        <input :type="props.type == 'radio' || props.type == 'checkbox' ? props.type : 'checkbox'"
               :id="index"
               :value="option"
               v-model="selectedOptions"
               @input="() => {if (props.type === 'radio') {showDropdown = false}}"
        >
        <label :for="index"
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
    default: '',
  },
  options: {
    type: Array,
    required: true,
  },
  type: {
    validator(value) {
      return ['radio', 'checkbox'].includes(value)
    },
    default: 'checkbox',
  }
})

const emit = defineEmits(['update:model-value'])

const selectedOptions = ref([])

watch(selectedOptions, () => {
  emit('update:model-value', selectedOptions.value)
})

const dropdownRef = ref(null)

const showDropdown = ref(false)


const hideOptions = (element) => {
  if (!dropdownRef.value.contains(element.target)) {
    showDropdown.value = false
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

/*
TODO: Criar um estilo para checkbox e outro para radio
Referencia: https://moderncss.dev/pure-css-custom-checkbox-style/
*/

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