<template>
  <!--begin: Visualizer Character-->
  <div class="w-full h-full rounded-xl shadow-xl border-4 border-gray-300">
    <div class="w-full">
      <!-- begin: Status -->
      <div class="absolute mt-4 ml-2">
        <div class="p-0.5 rounded-md text-white font-medium" :class="colorsStatusCharacter[character.status]">
          {{ character.status.toUpperCase() }}
        </div>
      </div>
      <!-- end: Status -->
      <!--begin: Favorite Button-->
      <div class="flex justify-end cursor-pointer" 
           @click="() => {
            fillIcon = !fillIcon
            emit('send:character', { id: props.character.id, name: props.character.name })
          }"
      >
        <div class="absolute mt-4 mr-4 z-0 ">
          <Star :class="fillIcon ? 'fill-yellow-500' : ''" class="scale-[1.5] stroke-2 stroke-yellow-500" />
        </div>
      </div>
      <!--begin: Favorite Button-->

      <!--begin: Character Image-->
      <div class="w-full">
        <img :src="character.image" class="rounded-t-lg" />
      </div>
      <!--end: Character Image-->

      <!--begin: Section Character Data-->
      <section class="grid gap-2 pl-2 py-1 text-lg rounded-b-xl">
        <header class="font-bold text-xl">
          {{ character.name }}
        </header>
        <p><b>Species:</b> {{ character.species }}</p>
        <p><b>Gender:</b> {{ character.gender }}</p>
      </section>
      <!--end: Section Character Data-->
    </div>
  </div>
  <!--end: Visualizer Character-->
</template>

<script setup>
import { Star } from 'lucide-vue-next'
import { ref } from 'vue'

const fillIcon = ref(false)

const props = defineProps({
  character: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['send:character'])

const colorsStatusCharacter = {
  'Alive': 'bg-green-400',
  'Dead': 'bg-red-400',
  'unknown': 'bg-gray-400',
}
</script>
