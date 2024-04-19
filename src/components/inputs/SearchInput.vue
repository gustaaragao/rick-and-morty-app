<template>
  <div>
    <!-- begin: Search Input -->
    <div class="flex border-4 rounded-full focus:border-green-300">
      <input
        type="text"
        v-model="searchedValue"
        placeholder="Search for a character..."
        @input="
          (event) => {
            emit('update:model-value', event.target.value)
          }
        "
        class="size-full p-4 rounded-full focus:outline-none"
      />
      <!--begin: Search Icon-->
      <div class="flex items-center justify-center mr-4">
        <i class="scale-[0.9] text-[#718095]">
          <Search />
        </i>
      </div>
      <!--end: Search Icon-->
    </div>
    <!-- end: Search Input -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from 'lucide-vue-next'

const emit = defineEmits(['update:model-value'])

const searchedValue = ref('')
</script>
