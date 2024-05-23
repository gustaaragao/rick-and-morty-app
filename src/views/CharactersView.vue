<template>
  <div class="flex px-20 pt-8 gap-4">
    <!--begin: Search Input-->
    <BaseInput placeholder="Search for a character...">
      <template #icon>
        <Search />
      </template>
    </BaseInput>
    <!--end: Search Input-->
    <!-- begin: Select Filters -->
    <Select title="Filters"
            :options=optionsFilter
            v-model="selectedFilters"
    >
      <template #icon>
        <Filter />
      </template>
    </Select>
    <!-- end: Select Filters -->
  </div>
  <!-- begin: Label Select Filters -->
  <LabelSelect :selectedOptions="selectedFilters"></LabelSelect>
  <!-- end: Label Select Filters -->
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
import { onMounted, ref, watch } from 'vue'

import { ramRouter } from '@/services/api/routing/routers/ramRouter'
import { dbRouter } from '@/services/api/routing/routers/dbRouter'

import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseInput from '@/components/inputs/text/BaseInput.vue'
import VisualizerCharacter from '@/components/visualizer/VisualizerCharacter.vue'
import Select from '@/components/inputs/select/Select.vue'
import LabelSelect from '@/components/inputs/select/LabelSelect.vue'

import { Search, CircleX, Filter } from 'lucide-vue-next'

const optionsFilter = ref(['Opcao1', 'Opcao2', 'Opcao3'])

const selectedFilters = ref([])

const removeFilter = (selectedFilters, filter) => {
  const index = selectedFilters.indexOf(filter)

  if (index > -1) {
    selectedFilters.splice(index, 1)
  }
}

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