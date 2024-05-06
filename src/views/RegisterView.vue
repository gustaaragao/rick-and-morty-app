<template>
  <!--begin: Register -->
  <div
    class="relative grid gap-4 pl-4 pt-2 pr-[450px] pb-[100px]"
    @keyup.enter="() => submitForm()"
  >
    <h1>Register</h1>
    <!-- begin: First Name Input -->
    <BaseInput
      label="First Name"
      placeholder="First Name"
      focusColor="violet-400"
      :validation-parameters="validationParametersFirstName"
      :error="!!errorMessage"
      @update:model-value="
        (value) => {
          form.firstname = value
        }
      "
      @validate:input="
        (value) => {
          validateForm(value)
        }
      "
    >
    </BaseInput>
    <!-- end: First Name Input -->
    <!-- begin: Last Name Input -->
    <BaseInput
      label="Last Name"
      placeholder="Last Name"
      focusColor="violet-400"
      :validation-parameters="validationParametersLastName"
      :error="!!errorMessage"
      @update:model-value="
        (value) => {
          form.lastname = value
        }
      "
      @validate:input="
        (value) => {
          validateForm(value)
        }
      "
    >
    </BaseInput>
    <!-- end: Last Name Input -->
    <!-- begin: Username Input -->
    <BaseInput
      label="Username"
      placeholder="Username"
      focusColor="violet-400"
      :validation-parameters="validationParametersUser"
      :error="!!errorMessage"
      @update:model-value="
        (value) => {
          form.username = value
        }
      "
      @validate:input="
        (value) => {
          validateForm(value)
        }
      "
    >
      <template #icon>
        <UserRound />
      </template>
    </BaseInput>
    <!-- end: Username Input -->
    <!-- begin: E-mail Input -->
    <BaseInput
      label="E-mail"
      placeholder="E-mail"
      focusColor="violet-400"
      :validation-parameters="validationParametersEmail"
      :error="!!errorMessage"
      @update:model-value="
        (value) => {
          form.email = value
        }
      "
      @validate:input="
        (value) => {
          validateForm(value)
        }
      "
    >
      <template #icon>
        <Mail />
      </template>
    </BaseInput>
    <!-- end: E-mail Input -->
    <!-- begin: Password Input -->
    <BaseInput
      type="password"
      label="Password"
      placeholder="Password"
      :validation-parameters="validationParametersPassword"
      :error="!!errorMessage"
      focusColor="violet-400"
      @update:model-value="
        (value) => {
          form.password = value
        }
      "
    >
      <template #icon>
        <KeyRound />
      </template>
    </BaseInput>
    <!-- end: Password Input -->
    <!-- begin: Confirm Password Input -->
    <BaseInput
      type="password"
      label="Confirm Password"
      placeholder="Confirm Password"
      :error="!!errorMessage"
      focusColor="violet-400"
      @update:model-value="
        (value) => {
          form.confirmPassword = value
        }
      "
    >
      <template #icon>
        <KeyRound />
      </template>
    </BaseInput>
    <!-- end: Confirm Password Input -->
    <!-- begin: Error Span -->
    <div
      v-show="errorMessage"
      class="flex justify-center text-red-600 text-xs font-semibold"
      :class="errorMessage ? 'animate-shake-l' : ''"
    >
      {{ errorMessage }}
    </div>
    <!-- end: Error Span -->
    <!-- begin: Submit Button -->
    <div class="flex justify-center gap-5 select-none">
      <BaseButton design="LightButton" @click="submitForm()" :disabled="!isFormValid">
        <template #text> Register </template>
      </BaseButton>
    </div>
    <!-- end: Submit Button -->
  </div>
  <!--end: Register -->
</template>

<script setup>
import BaseInput from '@/components/inputs/BaseInput.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import { UserRound, KeyRound, Mail } from 'lucide-vue-next'
import { ref } from 'vue'

import { dbRouter } from '@/services/api/routing/routers/dbRouter.js'
import router from '@/router'

const errorMessage = ref('')

const form = ref({
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const validationParametersFirstName = {
  minLength: 2,
  maxLength: 30
}

const validationParametersLastName = {
  minLength: 2,
  maxLength: 30
}

const validationParametersUser = {
  minLength: 2,
  maxLength: 30
}

const validationParametersEmail = {
  pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
  maxLength: 100
}

const validationParametersPassword = {
  pattern: '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-+])(?=.{8,})[a-zA-Z0-9!@#$%^&*()-+]+$',
  patternErrorMessage: 'The password must contain at least 8 upper and lower characters with at least one number from 0-9 and one special character (!@#$%^&*()-+).'
}

const isFormValid = ref(true)

const isFormFilled = ref(false)

const isConfirmPasswordValid = ref(false)

const validateForm = (isValid) => {
  isFormValid.value = isValid
}

const checkFilledForm = () => {
  const valuesForm = Object.values(form.value)

  try {
    valuesForm.forEach((input) => {
      if (!input) {
        throw new Error('Please, fill in the required fields.')
      }
      isFormFilled.value = true
    })
  } catch (err) {
    isFormFilled.value = false
    errorMessage.value = err.message
  }
}

const checkConfirmPassword = () => {
  if (form.value.password === form.value.confirmPassword) {
    isConfirmPasswordValid.value = true
  } else {
    isConfirmPasswordValid.value = false
    errorMessage.value = 'The password confirmation does not match.'
  }
}

const submitForm = () => {
  if (!isFormValid.value) {
    alert('INVALID FORM')
  } else {
    checkFilledForm()

    if (isFormFilled.value) {
      checkConfirmPassword()

      if (isConfirmPasswordValid.value) {
        console.log('SUBMIT >>>>>>', form.value)
        errorMessage.value = ''
        tryRegister()
      }
    }
  }
}

async function tryRegister() {
  return
}
</script>
