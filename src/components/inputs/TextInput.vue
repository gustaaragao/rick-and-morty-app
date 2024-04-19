<template>
  <div>
    <label v-if="label">
      {{ label }}
    </label>
    <div class="border-2 rounded-xl w-fit flex">
      <!--begin: Icon-->
      <div class="flex items-center justify-center pl-1">
        <i class="scale-[0.8] text-[#718095]">
          <slot name="icon"></slot>
        </i>
      </div>
      <!--end: Icon-->
      <!--begin: Text Input-->
      <input type="text" :placeholder="placeholder" class="rounded-xl focus:outline-none pl-2 py-1" v-bind="$attrs" />
      <!--end: Text Input-->
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: {
      type: [String, Boolean],
      default: false
    }
  },
  typeInput: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String
  }
})
</script>
