<template>
  <!-- begin: Opacity Background -->
  <div v-if="showModal"
       class="absolute bg-black w-full h-screen z-50 bg-opacity-30 top-0 left-0 flex justify-center items-center align-middle">
    <!-- begin: Modal -->
    <div class="bg-white rounded-2xl p-4 min-w-96"
         ref="modalRef"
    >
      <!-- begin: Close Button -->
      <div class="w-full flex justify-end pr-4 py-2">
        <button @click="closeModal()">
          <X />
        </button>
      </div>
      <!-- end: Close Button -->
      <slot>
        Hello
      </slot>
    </div>
    <!-- end: Modal -->
  </div>
  <!-- end: Opacity Background -->
</template>

<script setup>
import { X } from 'lucide-vue-next';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  showModal: {
    type: Boolean,
    default: true,
  }
})

const showModal = ref(props.showModal);

const modalRef = ref(null)

const closeModal = () => {
  showModal.value = false
}

const closeModalClickOutside = (element) => {
  if (!modalRef.value.contains(element.target)) {
    showModal.value = false

    window.removeEventListener('click', closeModalClickOutside)
  }
}

onMounted(() => {
  window.addEventListener('click', closeModalClickOutside)
})

</script>
