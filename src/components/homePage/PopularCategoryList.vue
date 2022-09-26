<template>
  <div class="grid grid-cols-4 gap-6">
    <RouterLink
      :to="`/catalog/${cat.tk_id}`"
      v-for="cat in getPopularCategory"
      :key="cat.tk_id"
      class="pop-category-card no-underline text-gray-900 hover:text-gray-900"
      ><div class="rounded-2xl shadow-lg bg-white">
        <div class="flex justify-between space-x-4 items-center px-6 py-6">
          <div class="pop-category-card__title font-medium">
            {{ cat.name }}
          </div>
          <div class="pop-category-card__image-block">
            <img
              class="object-contain w-full h-full"
              :src="cat.imgpath"
              :alt="cat.name"
            />
          </div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
// import {computed} from 'vue'
import { useHomeStore } from "@/stores/home";

const { getPopularCategory } = useHomeStore();
</script>
