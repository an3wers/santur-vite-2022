<template>
  <div v-if="homeIsLoaded" class="home-page -mt-5">
    <!-- <home-body /> -->
    <div class="section_grey pt-10 pb-20 bg-slate-150">
      <div class="container">
        <div>
          <home-slider />
          <features />
          <popular-categories />
          <narrow-slider />
        </div>
      </div>
    </div>
    <div class="section py-20">
      <div class="container">
        <sale-products />
        <bottom-banner />
        <news />
      </div>
    </div>
  </div>
  <PageLoader v-else />
  <!-- <AppLoader v-else /> -->
</template>

<script setup>
import HomeSlider from "@/components/homePage/HomeSlider.vue";
import PopularCategories from "@/components/homePage/PopularCategories.vue";
import NarrowSlider from "@/components/homePage/NarrowSlider.vue";
import SaleProducts from "@/components/homePage/SaleProducts.vue";
import BottomBanner from "@/components/homePage/BottomBanner.vue";
import News from "@/components/homePage/News.vue";
import Features from "@/components/homePage/Features.vue";
import PageLoader from '@/components/loaders/PageLoader.vue'

import { useHomeStore } from "@/stores/home";
import { ref } from 'vue'

const homeIsLoaded = ref(false)
const homeStore = useHomeStore();

async function loadHomePage() {
  // await homeStore.loadTopSlider();
  // await homeStore.loadNarrowSlider();
  // await homeStore.loadNews();
  await homeStore.loadPopularCategory();
  await homeStore.loadSales();
  homeIsLoaded.value = true
}

loadHomePage();

</script>
