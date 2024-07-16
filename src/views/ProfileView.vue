<template>
  <div class="flex">
    <!-- begin: User Data -->
    <div class="w-full h-full pt-4 flex flex-col items-center justify-center">
      <!-- begin: Inputs -->
      <div class="w-1/5">
        <div>
          <h2 class="py-2"> First Name </h2>
          <BaseInput
            placeholder="First Name"
            :model-value="user.firstname"
            @update:model-value="(value) => user.firstname = value"
            :validation-parameters="validationParametersName"
            @validate:input="(value) => isFormValid = value"
            :disabled="disableInputs"
          />
        </div>
        <div>
          <h2 class="py-2"> Last Name </h2>
          <BaseInput
            placeholder="Last Name"
            :model-value="user.lastname"
            @update:model-value="(value) => user.lastname = value"
            :validation-parameters="validationParametersName"
            @validate:input="(value) => isFormValid = value"
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
            :validation-parameters="validationParametersEmail"
            @validate:input="(value) => isFormValid = value"
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
            :validation-parameters="validationParametersPassword"
            @validate:input="(value) => isFormValid = value"
            :disabled="disableInputs"
          />
        </div>
      </div>
      <!-- end: Inputs -->
      <div
        v-show="errorMessage"
        class="flex justify-center pt-4 text-red-600 text-xs font-semibold"
        :class="errorMessage ? 'animate-shake-l' : ''"
      >
        {{ errorMessage }}
      </div>
      <!-- begin: Buttons -->
      <div class="flex gap-4 pt-8 pb-10">
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
  </div>
</template>

<script setup>
import BaseInput from '@/components/inputs/BaseInput.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';
import VisualizerCharacter from '@/components/visualizer/VisualizerCharacter.vue';
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

const favoriteCharacters = ref([])

onMounted(() => {
  fetchUserData();

  const userID = JSON.parse(localStorage.getItem('user-info')).id

  fetchFavoritesCharactersUser(userID);
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

const checkChangesUser = (user) => {
  const fieldsFilled = Object.values(user).every((value) => value !== '');

  return fieldsFilled && isFormValid.value;
}

const errorMessage = ref('')

const saveChanges = () => {
  const changesAreValid = ref(checkChangesUser(user));

  if (changesAreValid.value) {
    dbRouter.users.updateUser(
      userID, user.firstname, user.lastname, user.username, user.email, user.password
    )
    .then((response) => {
      // TODO: TOAST NOTIFICATION PARA SUCESSO
      console.log(response);

      disableEditMode()
    })
    .catch((err) => {
      console.error(err);
    })
  } else {
    errorMessage.value = 'Changes are not valid'
  }
}

const discardChanges = () => {
  fetchUserData()

  disableEditMode()
}

const fetchFavoritesCharactersUser = (userID) => {
  dbRouter.favorites.get(userID)
  .then((response) => {
    favoriteCharacters.value.push(...response.data.favCharacters)
  })
  .catch((err) => {
    console.error(err);
  })
}

</script>