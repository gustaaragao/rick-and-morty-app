<template>
  <div class="flex flex-col w-full">
    <!-- begin: Header -->
    <label class="text-gray-800 font-medium">
      <slot name="header"></slot>
    </label>
    <!-- end: Header -->
    <!-- begin: Input -->
    <div class="flex relative">
      <!-- begin: Icon -->
      <div 
          v-if="hasIcon()" 
          class="flex items-center justify-center px-2 bg-gray-100 
                 border-l border-y border-gray-200 rounded-l-md"
      >
        <i class="text-gray-400 scale-[0.9]">
          <slot name="icon"></slot>
        </i>
      </div>
      <!-- end: Icon -->
      <input 
        :type="typeInput"
        class="py-2 pl-2 focus:outline-none w-full disabled:cursor-not-allowed disabled:bg-gray-200
               border border-gray-200 text-dark-blue-950"
        :class="[
          hasIcon() ? 'rounded-r-md' : 'rounded-md',
          props.type === 'password' ? 'border-r-0 rounded-r-none' : ''
        ]"
        v-model="localValue"
        :disabled="props.disabled"
        :placeholder="props.placeholder"
        @input="(event)=>{
          emit('update:model-value', event.target.value)
        }"
        @blur="checkInput()"
      >
      <!-- begin: Show Password -->
      <div
        v-if="props.type === 'password'"
        class="flex items-center px-2 bg-gray-100 text-gray-400 border border-l-0 rounded-r-md"
      >
        <i
          v-if="openedEye"
          @click="handleShowPasswordButton()"
          class="cursor-pointer"
        >
          <Eye />
        </i>
        <i
          v-else
          @click="handleShowPasswordButton()"
          class="cursor-pointer"
        >
          <EyeOff />
        </i>
      </div>
      <!-- end: Show Password -->
    </div>
    <!-- begin: Error Message -->
    <div
      v-show="!!errorMessage || !!localError" 
      class="flex flex-row items-center text-sm text-red-500 pt-1 gap-0.5 w-fit"
    >
      <i class="scale-[0.60]">
        <CircleAlert />
      </i>
      <span> 
        {{ errorMessage || localError }}
      </span>
    </div>
    <!-- end: Error Message -->
  </div>
  <!-- end: Input -->
</template>

<script setup>
import { ref, useSlots, watch } from 'vue';
import { Eye, EyeOff, CircleAlert } from 'lucide-vue-next';
import { checkKeysOfObject } from '@/utils/utilsObject';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: [String, Boolean],
    default: false
  },
  validationParameters: {
    type: Object,
    validator: (obj) => {
      const patternIsValid = obj['pattern'] instanceof RegExp

      const patternErrorMessageIsValid= typeof obj['patternErrorMessage'] === 'string' && obj['patternErrorMessage'].length != 0

      return patternIsValid && patternErrorMessageIsValid
    }
  }
})

const emit = defineEmits(['update:model-value', 'validate:input'])

const localValue = ref(props.modelValue)

watch(() => props.modelValue, () => {
	localValue.value = props.modelValue
})

const typeInput = ref(props.type)

const hasIcon = () => {
  const slots = useSlots();

  return !!slots['icon'];
}

const openedEye = ref(true)

const showPassword = () => {
  if (typeInput.value === 'password') {
    typeInput.value = 'text'
  } else {
    typeInput.value = 'password'
  }
}

const handleShowPasswordButton = () => {
  openedEye.value = !openedEye.value

  showPassword()
}

const localError = ref('');

const checkInput = () => {
  if (props.validationParameters) {
    if (props.validationParameters['pattern'].test(localValue.value)) {
      localError.value = ''
      emit('validate:input', true)
    }
    else {
      localError.value = props.validationParameters['patternErrorMessage'] 
      emit('validate:input', false)
    }
  }
}

</script>