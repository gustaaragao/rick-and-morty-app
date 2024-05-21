<template>
  <div class="flex justify-center items-center min-h-[100vh]">
    <!--begin: Register -->
    <div
      class="grid gap-4 w-96 h-min p-6 border-2 border-gray-400 rounded-3xl shadow-2xl bg-white"
      @keyup.enter="() => submitForm()"
    >
      <h1 class="text-center text-2xl text-gray-400">Register</h1>
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
      <!-- begin: Register Button -->
      <div class="flex justify-center gap-4">
        <BaseButton @click="submitForm()" :disabled="!isFormValid">
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
    <ToastBox></ToastBox>
  </div>
</template>

<script setup>
import BaseInput from '@/components/inputs/BaseInput.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import { UserRound, KeyRound, Mail } from 'lucide-vue-next'
import { ref } from 'vue'

import { dbRouter } from '@/services/api/routing/routers/dbRouter.js'
import router from '@/router'

import ToastBox from '@/components/alerts/ToastNotification/ToastBox.vue'
import { toastNotificationSucess } from '@/components/alerts/ToastNotification/toastNotification'
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
  patternErrorMessage:
    'The password must contain at least 8 upper and lower characters with at least one number from 0-9 and one special character (!@#$%^&*()-+).'
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
      toastNotificationSucess('User created successfully.')
    })
    .catch((err) => {
      errorMessage.value = err
    })
}
</script>
