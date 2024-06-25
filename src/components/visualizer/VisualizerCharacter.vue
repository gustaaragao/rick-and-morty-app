<template>
  <div
    class="w-full h-full rounded-3xl shadow-lg"
    :class="designHorizontal ? 'flex' : ''"
  >
    <!-- begin: Character Image -->
    <div class="relative">
      <!-- begin: Status -->
      <div 
        class="absolute z-10"
        :class="designHorizontal ? 'top-4 left-4' : 'top-8 left-8'"
      >
          <div 
            class="rounded-md text-white font-bold" 
            :class="[
              colorsStatusCharacter[character.status],
              designHorizontal ? 'p-2 text-xl' : 'p-2 text-xl'  
            ]"
          >
              {{ character.status.toUpperCase() }}
          </div>
      </div>
      <img 
        :src="character.image" 
        class="min-w-full z-1"
        :class="designHorizontal ? 'rounded-l-3xl' : 'rounded-t-3xl'"  
      />
    </div>
    <!-- end: Character Image -->
     
    <!-- begin: Section Character Info -->
    <CharacterInfo
      :character="props.character"
      :showButtons="props.showButtons"
      :designHorizontal="props.designHorizontal"
    />
    <!-- end: Section Character Info -->
  </div>
</template>

<script setup>
import CharacterInfo from '@/components/visualizer/handler/CharacterInfo.vue';

const colorsStatusCharacter = {
  'Alive': 'bg-green-400',
  'Dead': 'bg-red-400',
  'unknown': 'bg-gray-400',
}

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

</script>
