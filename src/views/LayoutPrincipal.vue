<template>
  <div>
    <!--begin: TopBar -->
    <TopBar class="sticky top-0">
      <template #image>
        <img src="@\assets\rick_and_mordy_logo.png" />
      </template>
    </TopBar>
    <!--end: TopBar -->
    <!--begin: Search Input-->
    <div class="flex align-middle justify-center p-8">
      <SearchInput class="w-[30rem]"> </SearchInput>
    </div>
    <!--end: Search Input-->
    <!--begin: Section Characters-->
    <section class="grid grid-cols-3 gap-4 px-10">
      <div v-for="character in characters" :key="character?.id">
        <VisualizerCharacter class="" :character="character"> </VisualizerCharacter>
      </div>
    </section>
    <!--end: Section Characters-->
  </div>
</template>

<script setup>
import axios from 'axios'
import { onUpdated, ref } from 'vue'

import SearchInput from '@/components/inputs/SearchInput.vue'
import VisualizerCharacter from '@/components/visualizer/VisualizerCharacter.vue'
import TopBar from '@/components/TopBar.vue'

const characters = ref([])

const searchedCharacter = ref('')

axios.get(`character?name=${searchedCharacter.value}`).then((response) => {
  characters.value = response.data.results
})

onUpdated(() => {
  axios.get(`character?name=${searchedCharacter.value}`).then((response) => {
    characters.value = response.data.results
  })
})
</script>
