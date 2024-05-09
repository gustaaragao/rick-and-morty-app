<template>
  <!--begin: Visualizer Character-->
  <div class="w-full h-full rounded-xl bg-green-300 shadow-2xl">
    <div class="w-full">
      <!--begin: Favorite Button-->
      <div
        class="flex justify-end cursor-pointer"
        @click="
          () => {
            fillIcon = !fillIcon
            emit('send:character', { id: props.character.id, name: props.character.name })
          }
        "
      >
        <div class="absolute mt-4 mr-4 z-0">
          <Star :class="fillIcon ? 'fill-blue-500' : ''" class="scale-[1.5] stroke-[1.5px]" />
        </div>
      </div>
      <!--begin: Favorite Button-->

      <!--begin: Character Image-->
      <div class="w-full">
        <img :src="character.image" class="rounded-t-xl" />
      </div>
      <!--end: Character Image-->

      <!--begin: Section Character Data-->
      <section class="grid gap-2 pl-2 pb-1 text-lg rounded-b-xl">
        <header class="text-xl">{{ character.name }}</header>
        <p><b>Status:</b> {{ character.status }}</p>
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
</script>
