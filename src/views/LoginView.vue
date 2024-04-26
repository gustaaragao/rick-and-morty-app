<template>
  <!--begin: Login -->
  <div class="relative grid gap-4 pl-4 pt-2 pr-[450px]" @keyup.enter="() => submitForm()">
    <h1>Login</h1>
    <!-- begin: User Input -->
    <BaseInput label="User" placeholder="User" focusColor="violet-400" :validation-parameters="validationParametersUser"
      @update:model-value="(value) => {
        form.username = value
      }
        " @validate:input="(value) => {
          validateForm(value)
        }
          ">
      <template #icon>
        <UserRound />
      </template>
    </BaseInput>
    <!-- end: User Input -->
    <!-- begin: Password Input -->
    <BaseInput type="password" label="Password" placeholder="Password" focusColor="violet-400" @update:model-value="(value) => {
      form.password = value
    }
      ">
      <template #icon>
        <KeyRound />
      </template>
    </BaseInput>
    <!-- end: Password Input -->
    <!-- begin: Error Span -->
    <div v-show="errorMessage" class="flex justify-center text-red-600 text-xs font-semibold">
      {{ errorMessage }}
    </div>
    <!-- end: Error Span -->
    <!-- begin: Submit Button -->
    <div class="flex justify-center gap-5 select-none">
      <BaseButton design="LightButton" @click="submitForm()" :disabled="!isFormValid">
        <template #text> Login </template>
      </BaseButton>
    </div>
    <!-- end: Submit Button -->
  </div>
  <!--end: Login -->
</template>

<script setup>
import BaseInput from '@/components/inputs/BaseInput.vue'
import BaseButton from '@/components/buttons/BaseButton.vue'
import { UserRound, KeyRound } from 'lucide-vue-next'
import { ref } from 'vue'

import { dbRouter } from '@/services/api/routing/routers/dbRouter.js'
import router from '@/router'

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
        throw new Error("Please, fill in the required fields.")
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
      console.log('SUBMIT:', form.value)
      tryLogin()
    }
  }
}

async function tryLogin() {
  let response = await dbRouter.login.get(form.value.username, form.value.password)

  if ((response.status == 200 || response.status == 201) && response.data.length > 0) {
    router.push('/')

    return
  }
  // TODO: Error
  console.log('ERROR TRY LOGIN')
}

</script>
