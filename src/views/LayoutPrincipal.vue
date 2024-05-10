<template>
  <div>
    <!--begin: TopBar -->
    <TopBar class="sticky top-0">
      <template #image>
        <img src="@\assets\rick_and_morty_logo.png" />
      </template>
    </TopBar>
    <!--end: TopBar -->
    <!--begin: Search Input-->
    <div class="flex align-middle justify-center p-8">
      <SearchInput class="w-[30rem]" @update:model-value="(value) => (searchedCharacter = value)">
      </SearchInput>
    </div>
    <!--end: Search Input-->
    <!--begin: Section Characters-->
    <section class="grid grid-cols-3 gap-4 px-10 pb-10">
      <div v-for="character in characters" :key="character?.id">
        <!-- TODO: Como capturar o id do usuário da Sessão e como modificar o personagem -->
        <VisualizerCharacter
          :character="character"
          @send:character="(character) => {dbRouter.favorites.addFavorite('1', character)}"
        >
        </VisualizerCharacter>
      </div>
    </section>
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
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

import { ramRouter } from '@/services/api/routing/routers/ramRouter'
import { dbRouter } from '@/services/api/routing/routers/dbRouter'

import BaseButton from '@/components/buttons/BaseButton.vue'
import SearchInput from '@/components/inputs/SearchInput.vue'
import VisualizerCharacter from '@/components/visualizer/VisualizerCharacter.vue'
import TopBar from '@/components/TopBar.vue'

const characters = ref([])

const searchedCharacter = ref('')

const nextPageLink = ref('')

onMounted(() => {
  ramRouter.characters.get().then((response) => {
    characters.value = response.data.results

    nextPageLink.value = response.data.info.next
  })
})

// onUpdated(() => {
//   ramRouter.characters.get(name).then((response) => {
//     characters.value = response.data.results

//     nextPageLink.value = response.data.info.next
//   })
// })

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
