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
        >
          <template #text>Search</template>
        </BaseButton>
        <!-- end: Search Button -->
        <!-- begin: Clear Button -->
        <BaseButton 
          @click="clearSearchInputs()"
          design='LightButton'
        >
          <template #text>Clear</template>
        </BaseButton>
        <!-- end: Clear Button -->
      </div>
    </div>
    <!-- begin: Options Filters -->
    <div class="flex flex-col gap-4 pt-4 pb-6">
      <RadioInput title="Status:"
                  class="flex gap-6"
                  input-name="status-input" 
                  :options="optionsFilterStatus" 
                  :model-value="searchObject.status"
                  @update:model-value="(value) => { searchObject.status = value }"
      />
      <RadioInput title="Gender:"
                  class="flex gap-6"
                  input-name="gender-input"
                  :options="optionsFilterGender" 
                  :model-value="searchObject.gender"
                  @update:model-value="(value) => { searchObject.gender = value }"
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
  <!-- begin: Load More Button -->
  <!-- <div v-if="!!nextPageLink">
    <div class="flex justify-center py-10">
      <BaseButton @click="loadNextPage(nextPageLink)">
        <template #text> Load More </template>
      </BaseButton>
    </div>
  </div> -->
  <!-- end:  Load More Button -->
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'

import { ramRouter } from '@/services/api/routing/routers/ramRouter'

import BaseButton from '@/components/buttons/BaseButton.vue'
import BaseInput from '@/components/inputs/text/BaseInput.vue'
import RadioInput from '@/components/inputs/radio/RadioInput.vue'
import VisualizerCharacter from '@/components/visualizer/VisualizerCharacter.vue'

import { Search } from 'lucide-vue-next'

const optionsFilterStatus = ref(['alive', 'dead', 'unknown'])
const optionsFilterGender = ref(['female', 'male', 'genderless', 'unknown'])

const characters = ref([])

onMounted(() => {
  ramRouter.characters.getAll().then((response) => {
    characters.value = response.data.results
  })
})

const searchObject = reactive({ value: '', status: '', gender: '' })

const searchCharacters = () => {
    ramRouter.characters.getAll(searchObject.value, searchObject.status, searchObject.gender)
    .then((response) => {
      characters.value = response.data.results

      nextPageLink.value = response.data.info.next
    })
    .catch((err) => {
      console.error(err)
    })
}

const clearSearchInputs = () => { 
  searchObject.value = ''
  searchObject.status = ''
  searchObject.gender = ''

  searchCharacters()
}

</script>