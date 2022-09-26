<template>
  <div class="home-slider mb-14">
    <div class="home-slider__body">
      <Carousel
        class="carousel-cards"
        :settings="settings"
        :breakpoints="breakpoints"
      >
        <Slide v-for="slide in slides" :key="slide.id">
          <div class="carousel__item">
            <div class="home-slider__banner w-full h-full">
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
    </div>
  </div>
</template>

<script setup>
// import { useHomeStore } from '@/stores/home'
import { ref } from "vue";
import { Carousel, Navigation, Slide, Pagination } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

// const { getSlider } = useHomeStore()

const slides = ref([
  {
    id: "1",
    url: "https://santur.ru",
    image: "../src/assets/images/sliders/4_pro.jpg",
  },
  {
    id: "2",
    url: "https://santur.ru",
    image: "../src/assets/images/sliders/5_seti.jpg",
  },
  {
    id: "3",
    url: "https://santur.ru",
    image: "../src/assets/images/sliders/3_fire.jpg",
  },
  {
    id: "4",
    url: "https://santur.ru",
    image: "../src/assets/images/sliders/2_about.jpg",
  },
  {
    id: "5",
    url: "https://santur.ru",
    image: "../src/assets/images/sliders/1_mobile.jpg",
  },
]);

const settings = {
  itemsToShow: 1,
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
