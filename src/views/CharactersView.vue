<template>
  <div class="flex p-8 gap-4">
    <!--begin: Search Input-->
    <BaseInput placeholder="Search for a character...">
      <template #icon>
        <Search />
      </template>
    </BaseInput>
    <!--end: Search Input-->
    <!-- begin: Dropdown Filters -->
    <Dropdown title="Filters" :options=[1,2,3]>

    </Dropdown>
    <!-- end: Dropdown Filters -->
  </div>
  <!--begin: Section Characters-->
  <!-- <section class="grid grid-cols-3 gap-4 px-10 pb-10">
    <div v-for="character in characters" :key="character?.id">
      <VisualizerCharacter :character="character"
        @send:character="(character) => { dbRouter.favorites.addFavorite('1', character) }">
      </VisualizerCharacter>
    </div>
  </section> -->
  <!--end: Section Characters-->
  <!-- begin: Load More Button -->
  <div v-if="!!nextPageLink">
    <div class="flex justify-center pb-8">
      <BaseButton @click="loadNextPage(searchedCharacter, nextPageLink)">
        <template #text> Load More </template>
      </BaseButton>
    </div>
  </div>
  <!-- end:  Load More Button -->
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { ramRouter } from '@/services/api/routing/routers/ramRouter'
import { dbRouter } from '@/services/api/routing/routers/dbRouter'

import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseInput from '@/components/inputs/BaseInput.vue'
import VisualizerCharacter from '@/components/visualizer/VisualizerCharacter.vue'
import Dropdown from '@/components/dropdown/Dropdown.vue'

import { Search } from 'lucide-vue-next'

const characters = ref([])

const searchedCharacter = ref('')

const nextPageLink = ref('')

onMounted(() => {
  ramRouter.characters.get().then((response) => {
    characters.value = response.data.results

    nextPageLink.value = response.data.info.next
  })
})

const loadNextPage = (searchedCharacter, nextPageLink) => {
  if (nextPageLink) {
    const numberPage = nextPageLink.match(/\?page=(\d+)/)[1]

    ramRouter.characters.loadNextPage(searchedCharacter, numberPage).then((response) => {
      characters.value.push(...response.data.results)
      nextPageLink = response.data.info.next
    })
  }
}
</script>