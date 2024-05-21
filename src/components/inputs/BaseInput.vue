<template>
  <div class="w-full" :class="props.error || localError ? 'animate-shake-r' : ''">
    <div v-if="props.label">
      <label class="text-md" :class="inputIsFocused ? 'text-purple-400' : 'text-gray-400'">
        {{ props.label }}
      </label>
    </div>
    <!--begin: container Base Input -->
    <div class="border-2 rounded-xl flex shadow-md mt-1" 
         :class="inputIsFocused ? 'border-purple-400' : 'border-gray-400'"
    >
      <!--begin: Icon-->
      <div v-if="$slots.icon" class="flex items-center justify-center pl-1">
        <i class="scale-[0.8]" 
           :class="inputIsFocused ? 'text-purple-400' : 'text-gray-400'" 
        >
          <slot name="icon"></slot>
        </i>
      </div>
      <!--end: Icon-->
      <!-- begin: Placeholder -->
      <div v-if="props.placeholder" 
           class="absolute z-0 opacity-65 pt-1 select-none"
           :class="$slots.icon ? 'pl-9' : 'pl-3'"
      >
        <span v-show="showPlaceholder"
              :class="inputIsFocused ? 'text-purple-400' : 'text-gray-400'"
        >
          {{ props.placeholder }}
        </span>
      </div>
      <!-- end: Placeholder -->
      <!-- begin: Input -->
      <input :type="inputType" 
             class="w-full rounded-xl focus:outline-none pl-2 mr-2 py-1 bg-transparent z-10"
             v-model="inputValue" 
             @focus="inputIsFocused = true"
             @blur="
              (event) => {
                console.log(event.target)
                inputIsFocused = false
                validateInput(event)
              }" 
             @input="
              (event) => {
                emit('update:model-value', event.target.value)
                hidePlaceholder()
              }" 
     />
      <!-- end: Input -->
      <!-- begin: Toggle Password Visibility -->
      <div v-if="props.type === 'password'"
           class="flex items-center justify-end mr-2 cursor-pointer scale-[0.75] opacity-50"
           :class="inputIsFocused ? 'text-purple-400' : 'text-gray-400'"
           @click="() => {
            showPasswordBoolean = !showPasswordBoolean
            showPassword()
            inputIsFocused = !inputIsFocused
          }"
      >
        <i v-show="!showPasswordBoolean">
          <Eye />
        </i>
        <i v-show="showPasswordBoolean">
          <EyeOff />
        </i>
      </div>
      <!-- end: Toggle Password Visibility -->
    </div>
    <!--end: container Base Input -->
    <!-- begin: Error Message -->
    <div v-show="localError">
      <div class="flex flex-row items-center text-xs text-red-500 pt-1 gap-0.5">
        <i class="scale-[0.60]">
          <CircleAlert />
        </i>
        <span> {{ localError }} </span>
      </div>
    </div>
    <!-- end: Error Message -->
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Eye, EyeOff, CircleAlert } from 'lucide-vue-next'

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: Boolean,
    default: false
  },
  validationParameters: {
    type: Object,
    default: () => {
      return {
        pattern: '',
        minLength: null,
        maxLength: null,
        patternErrorMessage: '',
        maxLengthErrorMessage: '',
        minLengthErrorMessage: '',
        lengthErrorMessage: '',
      }
    }
  },
})

const emit = defineEmits(['update:model-value', 'validate:input'])

const inputValue = ref('')
const inputType = ref(props.type)

const showPlaceholder = ref(true)
const showPasswordBoolean = ref(false)

const inputIsFocused = ref(false)

let localError = ref('')

const validateInput = (event) => {
  // Parâmetros de Validação
  const patternRegex = props.validationParameters.pattern
  const maxLength = props.validationParameters.maxLength
  const minLength = props.validationParameters.minLength

  // Mensagens de Erro específicas
  const patternErrorMessage = props.validationParameters.patternErrorMessage
  const minLengthErrorMessage = props.validationParameters.minLengthErrorMessage
  const maxLengthErrorMessage = props.validationParameters.maxLengthErrorMessage
  const lengthErrorMessage = props.validationParameters.lengthErrorMessage

  const isPatternValid = patternRegex ? !!event.target.value.match(patternRegex) : true

  const isMaxLengthValid = maxLength ? event.target.value.length <= maxLength : true
  const isMinLengthValid = minLength ? event.target.value.length >= minLength : true

  const isLengthValid = isMaxLengthValid && isMinLengthValid

  if (!isPatternValid) {
    localError.value = patternErrorMessage ? patternErrorMessage : `The ${props.type} is not valid.`
  } else if (!isLengthValid) {
    if (!maxLength) {
      localError.value = maxLengthErrorMessage ? maxLengthErrorMessage : `The input must be at least ${minLength} character(s) long.`
    } else if (!minLength) {
      localError.value = minLengthErrorMessage ? minLengthErrorMessage : `The input must have a maximum of ${maxLength} character(s).`
    } else {
      localError.value = lengthErrorMessage ? lengthErrorMessage : `The input must be between ${minLength} and ${maxLength} characters long.`
    }
  } else {
    localError.value = ''
  }

  emit('validate:input', isPatternValid && isLengthValid)
}

const hidePlaceholder = () => {
  showPlaceholder.value = inputValue.value.trim() === ''
}

const showPassword = () => {
  if (inputType.value === 'password') {
    inputType.value = 'text'
  } else {
    inputType.value = 'password'
  }
}
</script>
