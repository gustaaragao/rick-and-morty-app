<template>
  <div class="flex justify-center items-center min-h-[100vh]">
    <!--begin: Login -->
    <div class="grid gap-4 w-96 h-min p-6 border-2 border-gray-400 rounded-3xl shadow-2xl bg-white" @keyup.enter="() => submitForm()">
      <!-- begin: Title -->
      <h1 class="text-center text-2xl text-gray-400">
        Login
      </h1>
      <!-- end: Title -->
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
      <!-- begin: Password Input -->
      <BaseInput
        type="password"
        label="Password"
        placeholder="Password"
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
      <!-- begin: Error Span -->
      <div
        v-show="errorMessage"
        class="flex justify-center text-red-600 text-xs font-semibold"
        :class="errorMessage ? 'animate-shake-l' : ''"
      >
        {{ errorMessage }}
      </div>
      <!-- end: Error Span -->
      <!-- begin: Submit Buttons -->
      <div class="flex justify-center gap-4">
        <BaseButton @click="submitForm()" :disabled="!isFormValid">
          <template #text> Login </template>
        </BaseButton>
      </div>
      <!-- end: Submit Buttons -->
      <!-- begin: Register Button -->
      <div class="flex justify-center text-sm gap-1">
        <span>Don't have an account?</span> 
        <span class="cursor-pointer select-none underline text-green-500 hover:text-green-600 " @click="router.push('/register')">Sign up.</span>
      </div>
      <!-- end: Register Button -->
    </div>
    <!--end: Login -->
  </div>
</template>

<script setup>
import BaseInput from '@/components/inputs/BaseInput.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import { UserRound, KeyRound } from 'lucide-vue-next'
import { ref } from 'vue'

import { dbRouter } from '@/services/api/routing/routers/dbRouter.js'
import router from '@/router'

import { filterKeysOfObject } from '@/utils/utilsObject'

const errorMessage = ref('')

const form = ref({
  username: '',
  password: ''
})

const validationParametersUser = {
  minLength: 2,
  maxLength: 30
}

const isFormValid = ref(true)

const isFormFilled = ref(false)

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

const submitForm = () => {
  if (!isFormValid.value) {
    alert('INVALID FORM')
  } else {
    checkFilledForm()

    if (isFormFilled.value) {
      errorMessage.value = ''
      tryLogin()
    }
  }
}

async function tryLogin() {
  let response = await dbRouter.login.get(form.value.username, form.value.password)

  if ((response.status == 200 || response.status == 201) && response.data.length > 0) {
    let userInfo = response.data[0]

    userInfo = filterKeysOfObject(userInfo, ['id', 'firstname', 'lastname', 'username', 'email'])

    localStorage.setItem('user-info', JSON.stringify(userInfo))

    router.push('/characters')

    return
  }

  errorMessage.value = 'Incorrect Username or Password'
}
</script>
