<template>
  <!--begin: Login -->
  <div class="relative grid gap-4 pl-4 pt-2 pr-[450px]" @keyup.enter="() => login()">
    <h1>Login</h1>
    <!-- begin: User Input -->
    <BaseInput
      label="User"
      placeholder="User"
      focusColor="violet-400"
      :error="errorMessage"
      :validation-parameters="validationParametersUser"
      @update:model-value="
        (value) => {
          form.user = value
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
    <!-- end: User Input -->
    <!-- begin: Password Input -->
    <BaseInput
      type="password"
      label="Password"
      placeholder="Password"
      focusColor="violet-400"
      :error="errorMessage"
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

const errorMessage = ref('')

const form = ref({
  user: '',
  password: ''
})

const validationParametersUser = {
  minLength: 2,
  maxLength: 30
}

const isFormValid = ref(true)

const validateForm = (isValid) => {
  isFormValid.value = isValid
}

const submitForm = () => {
  if (!isFormValid.value) {
    alert('INVALID FORM')
  } else {
    login()
    console.log('SUBMIT:', form.value)
  }
}

async function login(){
  console.log('Login')
  return
}

</script>
