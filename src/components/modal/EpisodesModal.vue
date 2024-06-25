<template>
  <BaseModal>
    <template #icon>
      <Tv 
        size="3em"
        class="stroke-2"
      />
    </template>

    <div v-for="episode in props.episodesUrl">
      {{ episode }}
    </div>
  </BaseModal>
</template>

<script setup>
import BaseModal from './BaseModal.vue';
import { Tv } from 'lucide-vue-next';
import { ramRouter } from '@/services/api/routing/routers/ramRouter';

const props = defineProps({
  episodesUrl: {
    type: Array,
    required: true
  }
})

</script>