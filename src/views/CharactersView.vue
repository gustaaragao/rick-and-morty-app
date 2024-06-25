<template>
  <div class="px-96">

    <div class="flex items-center pt-8 gap-4">
      <!--begin: Search Input-->
      <BaseInput placeholder="Search for a character...">
        <template #icon>
          <Search />
        </template>
      </BaseInput>
      <!--end: Search Input-->
      <div class="flex gap-2">
        <!-- begin: Search Button -->
        <BaseButton>
          <template #text>Search</template>
        </BaseButton>
        <!-- end: Search Button -->
        <!-- begin: Clear Button -->
        <BaseButton design='LightButton'>
          <template #text>Clear</template>
        </BaseButton>
        <!-- end: Clear Button -->
      </div>
    </div>
    <!-- begin: Options Filters -->
    <div class="pt-3 pb-6 text-sm">
      <RadioInput title="Status:" 
                  :options="optionsFilterStatus" 
                  class="flex gap-4 pb-1.5"
                  @update:model-value="(value) => { selectedFilterStatus = value }">
      </RadioInput>
      <RadioInput title="Gender:" 
                  :options="optionsFilterGender" 
                  class="flex gap-4"
                  @update:model-value="(value) => { selectedFilterGender = value }">
      </RadioInput>
    </div>
    <!-- end: Options Filters -->
  </div>
  <!--begin: Section Characters-->
  <section class="grid grid-cols-4 gap-6 px-32">
    <div v-for="character in characters">
      <VisualizerCharacter 
        :character="character" 
      />
    </div>
  </section>
  <!--end: Section Characters-->
  <!-- begin: Load More Button -->
  <div v-if="!!nextPageLink">
    <div class="flex justify-center py-10">
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

import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseInput from '@/components/inputs/text/BaseInput.vue'
import RadioInput from '@/components/inputs/radio/RadioInput.vue'
import VisualizerCharacter from '@/components/visualizer/VisualizerCharacter.vue'

import { Search } from 'lucide-vue-next'

const optionsFilterStatus = ref(['Alive', 'Dead', 'unknown'])
const optionsFilterGender = ref(['Female', 'Male', 'Genderless', 'unknown'])

const selectedFilterStatus = ref('')
const selectedFilterGender = ref('')

const characters = ref([])

const searchedCharacter = ref('')

const nextPageLink = ref('')

onMounted(() => {
  ramRouter.characters.getAll().then((response) => {
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