<template>
  <button @click="showModal = true">
    <Eye />
  </button>
  <!-- begin: Modal -->
  <Teleport to="body">
    <!-- begin: Opacity Background -->
    <div 
      v-if="showModal"
      class="absolute z-50 top-0 left-0
             w-full h-screen bg-black-900 bg-opacity-60 
             flex justify-center items-center align-middle"
    >
      <!-- begin: Modal Content -->
      <div class="bg-white rounded-2xl p-4 min-w-96" ref="modalRef">
        <!-- begin: Close Button -->
        <div class="w-full flex justify-end pr-4 py-2">
          <button @click="closeModal()">
            <X />
          </button>
        </div>
        <!-- end: Close Button -->
        <slot>
        </slot>
      </div>
      <!-- end: Modal Content -->
    </div>
    <!-- end: Opacity Background -->
  </Teleport>
  <!-- end: Modal -->
</template>

<script setup>
import { Eye, X } from 'lucide-vue-next';
import { ref, useSlots } from 'vue';

const props = defineProps()

const slots = useSlots()

const showModal = ref(false);

const modalRef = ref(null)

const closeModal = () => {
  showModal.value = false
}
</script>