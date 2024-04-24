<template>
  <div class="w-full">
    <div v-if="props.label" class="text-md" ref="divLabel">
      <label>
        {{ props.label }}
      </label>
    </div>
    <!--begin: container Base Input -->
    <div class="border-2 rounded-xl flex shadow-md mt-1" ref="containerBaseInput">
      <!--begin: Icon-->
      <div class="flex items-center justify-center pl-1">
        <i class="scale-[0.8]">
          <slot name="icon" ref="iconSlot"></slot>
        </i>
      </div>
      <!--end: Icon-->
      <!-- begin: Placeholder -->
      <div v-if="props.placeholder" class="absolute z-0 opacity-65 pt-1 pl-9 select-none">
        <span v-show="showPlaceholder">{{ props.placeholder }}</span>
      </div>
      <!-- end: Placeholder -->
      <!-- begin: Input -->
      <input :type="inputType" class="w-fit rounded-xl focus:outline-none pl-2 mr-2 py-1 bg-transparent z-10"
        v-model="inputValue" @input="(event) => {
          validateInput(event)
          emit('update:model-value', event.target.value)
          hidePlaceholder()
        }
          " @focus="changeColorBaseInput(focusColorHex)" @blur="changeColorBaseInput(defaultColorHex)" />
      <!-- end: Input -->
      <!-- begin: Toggle Password Visibility -->
      <div v-if="props.type === 'password'"
        class="flex items-center justify-end mr-2 cursor-pointer scale-[0.75] opacity-50" @click="() => {
          showPasswordBoolean = !showPasswordBoolean
          showPassword()
          changeColorBaseInput(focusColorHex)
        }
          ">
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
    <div>
      <div :class="props.error || localError ? 'visible' : 'invisible'"
        class="flex flex-row items-center text-xs text-red-500 pt-1 gap-0.5">
        <i class="scale-[0.60]">
          <CircleAlert />
        </i>
        {{ props.error || localError }}
      </div>
    </div>
    <!-- end: Error Message -->
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Eye, EyeOff, CircleAlert } from 'lucide-vue-next'
import { transformTailwindColorToHex } from '@/utils/transformTailwindColorToHex.js'

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  defaultColor: {
    type: String,
    default: 'gray-400'
  },
  focusColor: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  validationParameters: {
    type: Object,
    default: () => {
      return {
        pattern: '',
        minLength: null,
        maxLength: null
      }
    }
  }
})

const emit = defineEmits(['update:model-value', 'form-validate'])

const defaultColorHex = ref('')
const focusColorHex = ref('')

const containerBaseInput = ref(null)
const divLabel = ref(null)

const inputValue = ref('')
const inputType = ref(props.type)

const showPlaceholder = ref(true)
const showPasswordBoolean = ref(false)

onMounted(() => {
  defaultColorHex.value = transformTailwindColorToHex(props.defaultColor)
  focusColorHex.value = transformTailwindColorToHex(props.focusColor)

  containerBaseInput.value.style.borderColor = defaultColorHex.value
  containerBaseInput.value.style.color = defaultColorHex.value
  divLabel.value.style.color = defaultColorHex.value
})

const changeColorBaseInput = (finalColorHex) => {
  containerBaseInput.value.style.borderColor = finalColorHex
  containerBaseInput.value.style.color = finalColorHex
  divLabel.value.style.color = finalColorHex
}

let localError = ''

const validateInput = (event) => {
  const patternRegex = props.validationParameters.pattern
  const maxLength = props.validationParameters.maxLength
  const minLength = props.validationParameters.minLength

  const isPatternValid = patternRegex ? !!event.target.value.match(patternRegex) : true

  const isMaxLengthValid = maxLength ? event.target.value.length <= maxLength : true
  const isMinLengthValid = minLength ? event.target.value.length >= minLength : true

  const isLengthValid = isMaxLengthValid && isMinLengthValid

  // TODO: Melhorar esse sistema de mensagens de erro.
  if (!isPatternValid) {
    localError = `The input is not valid.`
  } else if (!isLengthValid) {
    if (!maxLength) {
      localError = `The input must be at least ${minLength} character(s) long.`
    } else if (!minLength) {
      localError = `The input must have a maximum of ${maxLength} character(s).`
    } else {
      localError = `The input must be between ${minLength} and ${maxLength} characters long.`
    }
  } else {
    localError = ''
  }

  emit('form-validate', isPatternValid && isLengthValid)
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
