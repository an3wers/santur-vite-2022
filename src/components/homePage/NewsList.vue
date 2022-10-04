<template>
  <div class="news-list">
    <div class="grid grid-cols-2 xl:grid-cols-4 gap-6">
      <div v-for="news in news" :key="news.id" class="news-list__body flex-col">
        <div class="mb-2">
          {{ news.date }}
        </div>
        <a
          to="!#"
          class="hover:text-primary no-underline text-gray-900"
        >
          <div class="text-lg font-medium">
            {{ news.title }}
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHomeStore } from "@/stores/home";
// const homeStore = useHomeStore();
import { ref } from "vue";

const news = ref([
  {
    id: "1",
    title: "Виталий Федорцев: «Главный клиент бизнеса — это его сотрудник»",
    date: "25.05.2022",
  },
  {
    id: "2",
    title: "Трубы из сшитого полиэтилена PEX. Будет ли дефицит?",
    date: "18.05.2022",
  },
  {
    id: "3",
    title: "Кран шаровый LD REGULA в наличии на складе",
    date: "05.05.2022",
  },
  {
    id: "4",
    title: "Удастся ли избежать дефицита. Интервью для издания «Коммерсантъ»",
    date: "27.04.2022",
  },
]);
</script>
