<template>
  <div 
      class="w-full flex bg-white py-4 px-10"
      :class="designHorizontal ? 'rounded-r-3xl px-6' : 'rounded-b-3xl'"
    >
      <EpisodesModal 
        :episodes-url="character.episode"
      />     
      <!-- end: Show Episodes Button -->
      <!-- begin: Info -->
      <div class="w-full flex flex-col gap-2 self-center text-center">
        <h1 class="text-3xl font-extrabold">
          {{ character.name }}
        </h1>
        <p class="text-2xl">
            <span class="font-semibold">
              {{ character.species }}
            </span> 
            -
            <span class="font-medium">
              {{ character.gender }}
            </span> 
        </p>
        <p class="text-lg">
          <h3 class="font-semibold">
            Last known location:
          </h3>
          <i>
            {{ character.location.name }}
          </i>
        </p>
      </div>
      <!-- end: Info -->
      <!-- begin: Favorite Button -->
      <button
        v-if="showButtons"
        @click="handleFavoriteButton()"
        class="h-fit self-center"
      >
        <Star 
          size="3em" 
          class="stroke-2 stroke-yellow-500"
          :class="fillIcon ? 'fill-yellow-500' : ''" 
        />
      </button>
      <!-- end: Favorite Button -->
    </div>
</template>

<script setup>
import { Star } from 'lucide-vue-next';
import EpisodesModal from '@/components/modal/EpisodesModal.vue';
import { onMounted, ref } from 'vue';
import { dbRouter } from '@/services/api/routing/routers/dbRouter';

const props = defineProps({
  character: {
    type: Object,
    required: true
  },
  showButtons: {
    type: Boolean,
    default: true,
  },
  designHorizontal: {
    type: Boolean,
    default: false,
  }
})

const fillIcon = ref(false)

const checkFavoriteCharacter = () => {
  const userID = JSON.parse(localStorage.getItem('user-info')).id

  dbRouter.favorites.get(userID).then((response) => {
    const favorites = response.data.favCharacters
    
    const isFavoriteCharacter = favorites.some((favs) => JSON.stringify(favs) === JSON.stringify(props.character))

    if (isFavoriteCharacter) {
      fillIcon.value = true
    }
  })

}

onMounted(() => {
  checkFavoriteCharacter()
})

const handleFavoriteButton = () => {
  fillIcon.value = !fillIcon.value;

  const userID = JSON.parse(localStorage.getItem('user-info')).id

  dbRouter.favorites.updateFavorite(userID, props.character)
}

// TODO: Fazer modal para os Episodes 
const handleEpisodesButton = () => {
  console.log('episodes')
}
</script>