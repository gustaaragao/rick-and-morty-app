<template>
  
  <!-- begin: Show Button -->
  <div class="flex align-middle justify-center">
    <button v-if="slots.icon" @click="openModal()">
      <slot name="icon" />
    </button>
    
    <button v-else @click="openModal()">
      <Eye />
    </button>
  </div>
  <!-- begin: Show Button -->

  <!-- begin: Opacity Background -->
  <div 
    v-if="showModal"
    class="fixed inset-0 z-50 bg-black-900 bg-opacity-60 
           flex justify-center items-center align-middle"
  >
    <!-- begin: Modal Content -->
    <div 
      ref="modalRef"
      class="bg-gray-100 rounded-md max-w-4/5 h-4/5 min-h-fit overflow-y-auto" 
    >
      <!-- begin: Close Button -->
      <div 
        class="flex w-full justify-end bg-gray-100 py-4 pr-4">
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
</template>

<script setup>
import { Eye, X } from 'lucide-vue-next';
import { ref, onUpdated, useSlots } from 'vue';

const props = defineProps()

const emit = defineEmits(['show:modal', 'close:modal'])

const slots = useSlots()

const showModal = ref(false);

const modalRef = ref(null)

const openModal = () => {
  emit('show:modal')
  showModal.value = true
}

const closeModal = () => {
  emit('close:modal')
  showModal.value = false
}

const disableScrollPage = () => {
  if (showModal.value) {
    document.documentElement.style.overflow = 'hidden';
    return
  };
  document.documentElement.style.overflow = 'auto';
}

onUpdated(() => {
  disableScrollPage()
});
</script>