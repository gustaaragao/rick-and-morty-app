<template>
  <div class="flex">
    <!-- begin: User Data -->
    <div class="w-1/2 h-full pt-4 flex flex-col items-center justify-center">
      <!-- begin: Inputs -->
      <div class="w-2/3">
        <div>
          <h2 class="py-2"> First Name </h2>
          <BaseInput
            placeholder="First Name"
            :model-value="user.firstname"
            @update:model-value="(value) => user.firstname = value"
            :disabled="disableInputs"
          />
        </div>
        <div>
          <h2 class="py-2"> Last Name </h2>
          <BaseInput
            placeholder="Last Name"
            :model-value="user.lastname"
            @update:model-value="(value) => user.lastname = value"
            :disabled="disableInputs"
          />
        </div>
        <div>
          <h2 class="py-2"> Username </h2>
          <BaseInput
            placeholder="Username"
            :model-value="user.username"
            @update:model-value="(value) => user.username = value"
            :disabled="disableInputs"
          />
        </div>
        <div>
          <h2 class="py-2"> E-mail </h2>
          <BaseInput
            placeholder="E-mail"
            :model-value="user.email"
            @update:model-value="(value) => user.email = value"
            :disabled="disableInputs"
          />
        </div>
        <div>
          <h2 class="py-2"> Password </h2>
          <BaseInput
            type="password"
            placeholder="Password"
            :model-value="user.password"
            @update:model-value="(value) => user.password = value"
            :disabled="disableInputs"
          />
        </div>
      </div>
      <!-- end: Inputs -->
      <!-- begin: Buttons -->
      <div class="flex gap-4 py-10">
        <BaseButton
          :disabled="disableSaveButton"
          @click="saveChanges()"
        >
          <template #icon>
            <Save />
          </template>
          <template #text>
            Save
          </template>
        </BaseButton>
        <BaseButton
          color-button="red-600"
          color-hover-effect="red-700"
          :disabled="disableDiscardButton"
          @click="discardChanges()"
        >
          <template #icon>
            <Trash2 />
          </template>
          <template #text>
            Discard
          </template>
        </BaseButton>
        <BaseButton
          color-button="gray-700"
          color-hover-effect="gray-800"
          :disabled="disableEditButton"
          @click="editUser()"
        >
          <template #icon>
            <PenLine />
          </template>
          <template #text>
            Edit
          </template>
        </BaseButton>
      </div>
      <!-- end: Buttons -->
    </div>
    <!-- end: User Data -->
    <div class="w-1/2 bg-amber-300">
      TODO: FAVORITES CHARACTERS
    </div>
  </div>
</template>

<script setup>
import BaseInput from '@/components/inputs/BaseInput.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';
import { onMounted, reactive, ref } from 'vue';
import { dbRouter } from '@/services/api/routing/routers/dbRouter';
import { PenLine, Save, Trash2  } from 'lucide-vue-next';

const userID = JSON.parse(localStorage.getItem('user-info')).id

const user = reactive({
  'firstname': '',
  'lastname': '',
  'username': '',
  'email': '',
  'password': '',
})

async function fetchUserData() {
  try {
    const response = await dbRouter.users.getByID(userID);
    if (response?.data) {
      user.firstname = response.data.firstname;
      user.lastname = response.data.lastname;
      user.username = response.data.username;
      user.email = response.data.email;
      user.password = response.data.password;
    } else {
      console.error('User data not found.');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

onMounted(() => {
  fetchUserData()
})

const disableSaveButton = ref(true);
const disableDiscardButton = ref(true);
const disableEditButton = ref(false);

const disableInputs = ref(true);

const enableEditMode = () => {
  disableSaveButton.value = false;
  disableDiscardButton.value = false;
  disableEditButton.value = true;

  disableInputs.value = false;
}

const disableEditMode = () => {
  disableSaveButton.value = true;
  disableDiscardButton.value = true;
  disableEditButton.value = false;

  disableInputs.value = true;
}

const editUser = () => {
  if (!disableEditButton.value) {
    enableEditMode()
  }
  return
}

const checkChangesUser = (user) => {
  let fieldsFilled = Object.values(user).every((value) => value !== '');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let emailIsValid = emailRegex.test(user.email);
  
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-+])(?=.{8,})[a-zA-Z0-9!@#$%^&*()-+]+$/;
  let passwordIsValid = passwordRegex.test(user.password); 

  return fieldsFilled && emailIsValid && passwordIsValid;
}

const saveChanges = () => {
  const changesAreValid = ref(checkChangesUser(user));

  if (changesAreValid.value) {
    dbRouter.users.updateUser(
      userID, user.firstname, user.lastname, user.username, user.email, user.password
    )
    .then((response) => {
      // TODO: TOAST NOTIFICATION PARA SUCESSO
      console.error(response);

      disableEditMode()
    })
    .catch((err) => {
      console.error(err);
    })
  } else {
    // TODO: Melhorar as mensagens de erro
    console.error('USER DATA INCOMPLETE')
  }
}

const discardChanges = () => {
  fetchUserData()

  disableEditMode()
}

</script>