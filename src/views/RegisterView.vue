<template>
  <div class="flex justify-center items-center min-h-[100vh]">
    <!--begin: Register -->
    <div
      class="grid gap-4 w-[30rem] h-min p-6 border border-gray-300 rounded-3xl shadow-2xl bg-white"
      @keyup.enter="() => submitForm()"
    >
      <h1 class="text-center text-2xl text-gray-400">Register</h1>
      <!-- begin: First Name Input -->
      <BaseInput
        placeholder="First Name"
        @update:model-value="(value) => { form.firstname = value }"
        :validation-parameters="validationParametersName"
        @validate:input="(value) => isFormValid = value"
      />
      <!-- end: First Name Input -->
      <!-- begin: Last Name Input -->
      <BaseInput
        placeholder="Last Name"
        @update:model-value="(value) => { form.lastname = value }"
        :validation-parameters="validationParametersName"
        @validate:input="(value) => isFormValid = value"
      />
      <!-- end: Last Name Input -->
      <!-- begin: Username Input -->
      <BaseInput
        placeholder="Username"
        @update:model-value="(value) => { form.username = value }"
      >
        <template #icon>
          <UserRound />
        </template>
      </BaseInput>
      <!-- end: Username Input -->
      <!-- begin: E-mail Input -->
      <BaseInput
        placeholder="E-mail"
        @update:model-value="(value) => { form.email = value }"
        :validation-parameters="validationParametersEmail"
        @validate:input="(value) => isFormValid = value"
      >
        <template #icon>
          <Mail />
        </template>
      </BaseInput>
      <!-- end: E-mail Input -->
      <!-- begin: Password Input -->
      <BaseInput
        type="password"
        placeholder="Password"
        @update:model-value="(value) => { form.password = value }"
        :validation-parameters="validationParametersPassword"
        @validate:input="(value) => isFormValid = value"
      >
        <template #icon>
          <KeyRound />
        </template>
      </BaseInput>
      <!-- end: Password Input -->
      <!-- begin: Confirm Password Input -->
      <BaseInput
        type="password"
        placeholder="Confirm Password"
        @update:model-value="(value) => { form.confirmPassword = value }"
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
      <!-- begin: Register Button -->
      <div class="flex justify-center gap-4">
        <BaseButton 
          @click="submitForm()" 
          :disabled="!isFormValid"
          class="rounded-md"
        >
          <template #text> Register </template>
        </BaseButton>
      </div>
      <!-- end: Register Button -->
      <!-- begin: Login Button -->
      <div class="flex justify-center text-sm gap-1">
        <span>Already have an account?</span> 
        <span class="cursor-pointer select-none underline text-green-500 hover:text-green-600 " @click="router.push('/login')">Login in.</span>
      </div>
      <!-- end: Login Button -->
    </div>
    <!--end: Register -->
  </div>
</template>

<script setup>
import BaseInput from '@/components/inputs/BaseInput.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import { UserRound, KeyRound, Mail } from 'lucide-vue-next'
import { computed, ref } from 'vue'

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

const validationParametersName = {
  pattern: /^[a-zA-Z]+$/,
  patternErrorMessage: 'Invalid input. Please enter a text containing only letters (A-Z, a-z).'
}

const validationParametersEmail = {
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  patternErrorMessage: 'Invalid email address. Please enter a valid email address in the format: "example@domain.com".'
}

const validationParametersPassword = {
  pattern: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-+])(?=.{8,})[a-zA-Z0-9!@#$%^&*()-+]+$/,
  patternErrorMessage:
    'The password must contain at least 8 upper and lower characters with at least one number from 0-9 and one special character.'
}

const isFormValid = ref(true);

const isFormFilled = ref(false)

const isConfirmPasswordValid = ref(false)

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
        errorMessage.value = ''
        tryRegister()
      }
    }
  }
}

async function tryRegister() {
  await dbRouter.register
    .post(
      form.value.firstname,
      form.value.lastname,
      form.value.username,
      form.value.email,
      form.value.password
    )
    .then(async (response) => {
      const newUserID = response.data.id
      dbRouter.favorites.create(newUserID)
    })
    .catch((err) => {
      errorMessage.value = err
    })
}
</script>
