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
      <div :v-for="characterData in characters">
        <VisualizerCharacter class="" :character="characterData"> </VisualizerCharacter>
      </div>
    </section>
    <!--end: Section Characters-->
  </div>
</template>

<script setup>
import SearchInput from '@/components/inputs/SearchInput.vue'
import VisualizerCharacter from '@/components/visualizer/VisualizerCharacter.vue'
import TopBar from '@/components/TopBar.vue'

import { ref } from 'vue'

import axios from 'axios'

const characters = ref([])

// const searchedCharacter = ref('')

axios.get('character').then((response) => {
  characters.value = response.data.results
})
</script>
