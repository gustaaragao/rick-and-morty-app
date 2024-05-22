<template>
  <div class="flex px-20 pt-8 gap-4">
    <!--begin: Search Input-->
    <BaseInput placeholder="Search for a character...">
      <template #icon>
        <Search />
      </template>
    </BaseInput>
    <!--end: Search Input-->
    <!-- begin: Dropdown Filters -->
    <Dropdown title="Filters" :options=optionsFilter>
      <template #icon>
        <Filter />
      </template>
    </Dropdown>
    <!-- end: Dropdown Filters -->
  </div>
  <!-- begin: Filters -->
  <!-- <div class="flex justify-center gap-3 py-4 select-none">
    <div v-for="(selectedOption, index) in selectedOptionsFilter" 
         :key="index"
         class="flex align-center border-[1.5px] border-gray-400 rounded-xl 
                pl-2 py-0.5 text-xs text-gray-400"
    >
      {{ selectedOption }}
      <div class="scale-[0.5] cursor-pointer">
        <CircleX />
      </div>
    </div>
  </div> -->
  <!-- end: Filters -->
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

import { Search, CircleX, Filter } from 'lucide-vue-next'

const optionsFilter = ref(['Opcao1', 'Opcao2', 'Opcao3'])

const selectedOptionsFilter = ref(['Opcao2', 'Opcao3'])

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