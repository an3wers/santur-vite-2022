<template>
  <div class="narrow-slider mt-16">
    <Carousel
      class="carousel-cards"
      :settings="settings"
      :breakpoints="breakpoints"
    >
      <Slide v-for="slide in sliders" :key="slide.id">
        <div class="carousel__item">
          <div class="w-full h-full">
            <a target="_blank" :href="slide.url">
              <img
                :src="slide.image"
                alt=""
                class="w-full h-full object-cover object-center rounded-2xl"
              />
            </a>
          </div>
        </div>
      </Slide>
      <template #addons>
        <Pagination class="carousel-cards__pagination" />
        <Navigation class="carousel-cards__navigation" />
      </template>
    </Carousel>

    <!-- <div v-for="banner in homeStore.getNarrowBanner" :key="banner.id" class="narrow-slider__body">
      <a :href="banner.url">
        <img
          class="w-full h-full object-cover rounded-2xl"
          :src="banner.image"
          alt=""
        />
      </a>
    </div> -->
  </div>
</template>

<script setup>
// import {useHomeStore} from '@/stores/home'
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";
import { ref } from "vue";

// const { getNarrowBanner } = useHomeStore()

const sliders = ref([
  {
    id: "1",
    url: "https://santur.ru",
    image: "../src/assets/images/sliders/jakko_santur.jpg",
  },
  {
    id: "2",
    url: "https://santur.ru",
    image: "../src/assets/images/sliders/pex_santur.jpg",
  },
  {
    id: "3",
    url: "https://santur.ru",
    image: "../src/assets/images/sliders/santur_ros.jpg",
  },
]);

const settings = {
  itemsToShow: 1.3,
  snapAlign: "start",
  autoplay: 7000,
  wrapAround: true,
};

const breakpoints = {
  // 1296: {
  //     itemsToShow: 3.5,
  //      snapAlign: 'start',
  // }
};
</script>
