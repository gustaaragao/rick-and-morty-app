<template>
  <div class="px-96">
    <div class="flex items-center pt-8 gap-4">
      <!--begin: Search Input-->
      <BaseInput
        :model-value="searchObject.value"
        @update:model-value="(value) => { searchObject.value = value }"
        placeholder="Search for a character..."
      >
        <template #icon>
          <Search />
        </template>
      </BaseInput>
      <!--end: Search Input-->
      <div class="flex gap-2">
        <!-- begin: Search Button -->
        <BaseButton
          @click="searchCharacters()"
          class="rounded-md"
        >
          <template #icon>
            <Search />
          </template>
          <template #text> Search </template>
        </BaseButton>
        <!-- end: Search Button -->
        <!-- begin: Clear Button -->
        <BaseButton
          @click="clearSearchInputs()"
          color-button="gray-400"
          color-hover-effect="gray-500"
          class="rounded-lg"
        >
          <template #icon>
            <Eraser />
          </template>
        </BaseButton>
        <!-- end: Clear Button -->
      </div>
    </div>
    <!-- begin: Options Filters -->
    <div class="flex flex-col gap-4 pt-4 pb-6">
      <RadioInput
        title="Status:"
        class="flex gap-6"
        input-name="status-input"
        :options="optionsFilterStatus"
        :model-value="searchObject.status"
        @update:model-value="(value) => { searchObject.status = value }"
      />
      <RadioInput
        title="Gender:"
        class="flex gap-6"
        input-name="gender-input"
        :options="optionsFilterGender"
        :model-value="searchObject.gender"
        @update:model-value="
          (value) => {
            searchObject.gender = value;
          }
        "
      />
    </div>
    <!-- end: Options Filters -->
  </div>
  <!--begin: Section Characters-->
  <section class="grid grid-cols-4 gap-6 px-32 pt-10">
    <div v-for="character in characters">
      <VisualizerCharacter 
        :character="character" 
      />
    </div>
  </section>
  <!--end: Section Characters-->
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";

import { ramRouter } from "@/services/api/routing/routers/ramRouter";

import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/inputs/BaseInput.vue";
import RadioInput from "@/components/inputs/RadioInput.vue";
import VisualizerCharacter from "@/components/visualizer/VisualizerCharacter.vue";

import { Search, Eraser } from "lucide-vue-next";

const optionsFilterStatus = ref(["alive", "dead", "unknown"]);
const optionsFilterGender = ref(["female", "male", "genderless", "unknown"]);

const characters = ref([]);

onMounted(() => {
  ramRouter.characters.getAll().then((response) => {
    characters.value = response.data.results;
  });
});

const searchObject = reactive({ value: "", status: "", gender: "" });

const searchCharacters = () => {
  ramRouter.characters
    .getAll(searchObject.value, searchObject.status, searchObject.gender)
    .then((response) => {
      characters.value = response.data.results;
    })
    .catch((err) => {
      console.error(err);
    });
};

const clearSearchInputs = () => {
  searchObject.value = "";
  searchObject.status = "";
  searchObject.gender = "";

  searchCharacters();
};
</script>
