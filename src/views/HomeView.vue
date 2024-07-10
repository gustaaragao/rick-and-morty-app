<template>
  <div
    class="w-full h-full flex justify-center items-center fixed inset-0 gap-20"
  >
    <!-- begin: Characters Card -->
    <div
      class="flex flex-col items-center content-center gap-2 p-8 cursor-pointer border-4 border-gray-600 rounded-md bg-gray-100 text-gray-600"
      @click="pushRoute('characters')"
    >
      <PersonStanding size="20em" />
      <p class="text-6xl">
        Characters
      </p>
    </div>
    <!-- end: Characters Card -->
    <!-- begin: Locations Card -->
    <div
      class="flex flex-col items-center content-center gap-2 p-8 cursor-pointer border-4 border-gray-600 rounded-md bg-gray-100 text-gray-600"
      @click="pushRoute('locations')"
    >
      <Map size="20em" />
      <p class="text-6xl">
        Locations
      </p>
    </div>
    <!-- end: Locations Card -->
    <!-- begin: Episodes Card -->
    <div
      class="flex flex-col items-center content-center  gap-2 p-8 cursor-pointer border-4 border-gray-600 rounded-md bg-gray-100 text-gray-600"
      @click="pushRoute('episodes')"
    >
      <Tv size="20em" />
      <p class="text-6xl">
        Episodes
      </p>
    </div>
    <!-- end: Episodes Card -->
  </div>
</template>

<script setup>
import router from "@/router";
import { PersonStanding, Map, Tv } from "lucide-vue-next";

const pushRoute = (route) => {
  router.push(`/${route}`);
};
</script>
