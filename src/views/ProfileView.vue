<template>
  <div class="flex">
    <!-- begin: User Data -->
    <div class="w-1/2 h-full pt-20 flex flex-col items-center justify-center">
      <!-- begin: Inputs -->
      <div class="w-2/3">
        <div>
          <h2 class="py-2"> First Name </h2>
          <BaseInput
            placeholder="First Name"
            :model-value="user.firstname"
          />
        </div>
        <div>
          <h2 class="py-2"> Last Name </h2>
          <BaseInput
            placeholder="Last Name"
            :model-value="user.lastname"
          />
        </div>
        <div>
          <h2 class="py-2"> Username </h2>
          <BaseInput
            placeholder="Username"
            :model-value="user.username"
          />
        </div>
        <div>
          <h2 class="py-2"> E-mail </h2>
          <BaseInput
            placeholder="E-mail"
            :model-value="user.email"
          />
        </div>
        <div>
          <h2 class="py-2"> Password </h2>
          <BaseInput
            type="password"
            placeholder="Password"
            :model-value="user.password"
          />
        </div>
      </div>
      <!-- end: Inputs -->
      <!-- begin: Buttons -->
      <div class="flex gap-4 pt-10">
        <BaseButton>
          <template #icon>
            <Save />
          </template>
          <template #text>
            Save
          </template>
        </BaseButton>
        <BaseButton>
          <template #icon>
            <PenLine />
          </template>
          <template #text>
            Edit
          </template>
        </BaseButton>
        <BaseButton>
          <template #icon>
            <Trash2 />
          </template>
          <template #text>
            Discard
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
import { onMounted, reactive } from 'vue';
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

const editUser = () => {

}

const saveChanges = () => {

}

const discardChanges = () => {

}

</script>