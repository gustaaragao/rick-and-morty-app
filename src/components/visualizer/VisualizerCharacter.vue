<template>
  <div>
    <!-- begin: Character Image -->
    <div class="relative">
      <!-- begin: Status -->
      <div class="absolute top-8 left-8 z-10">
          <div 
            class="p-3 rounded-md text-white font-bold text-3xl" 
            :class="colorsStatusCharacter[character.status]"
          >
              {{ character.status.toUpperCase() }}
          </div>
      </div>
      <img :src="character.image" class="w-full z-1 rounded-t-3xl object-fill"/>
    </div>
    <!-- end: Character Image -->
    <!-- begin: Section Character Info -->
    <section 
      class="flex align-middle px-8 py-2 bg-white rounded-b-3xl"
      :class="showEpisodesButton ? 'gap-4' : 'relative gap-0'"
    >
      <!-- begin: Show Episodes Button -->
      <button
        v-if="showEpisodesButton"
        @click="handleEpisodesButton()"
      >
        <Tv 
          size="3em" 
          class="stroke-2"
        />
      </button>
      <!-- end: Show Episodes Button -->
      <!-- begin: Info -->
      <div class="w-full flex flex-col gap-2 text-center">
        <h1 class="text-3xl font-extrabold">
          {{ character.name }}
        </h1>
        <h2 class="text-3xl font-medium">
          {{ character.species }}
        </h2>
        <h3 class="text-2xl font-normal">
          {{ character.gender }}
        </h3>
      </div>
      <!-- end: Info -->
      <!-- begin: Favorite Button -->
      <button
        @click="handleFavoriteButton()"
        :class="showEpisodesButton ? '' : 'absolute top-11 right-8'"
      >
        <Star 
          size="3em" 
          class="stroke-2 stroke-yellow-500"
          :class="fillIcon ? 'fill-yellow-500' : ''" 
        />
      </button>
      <!-- end: Favorite Button -->
    </section>
    <!-- end: Section Character Info -->
  </div>
</template>

<script setup>
import { Star, Tv } from 'lucide-vue-next'
import { ref } from 'vue'

const colorsStatusCharacter = {
  'Alive': 'bg-green-400',
  'Dead': 'bg-red-400',
  'unknown': 'bg-gray-400',
}

const fillIcon = ref(false)

const props = defineProps({
  character: {
    type: Object,
    required: true
  },
  showEpisodesButton: {
    type: Boolean,
    default: true,
  }
})

const emit = defineEmits(['send:character'])

const handleFavoriteButton = () => {
  fillIcon.value = !fillIcon.value;
  emit('send:character', { id: props.character.id, name: props.character.name });
}

// TODO: Fazer modal para os Episodes 
const handleEpisodesButton = () => {
  console.log('episodes')
}

</script>
