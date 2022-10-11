<template>
  <div class="container">
    <app-breadcrumbs :breadcrumbs="breadcrumbs" />
    <h1>Новости</h1>
    <!-- Перебор новостей + постраничная навигация -->

    <div v-if="!isError && isNewsLoaded" class="grid gap-6 grid-cols-12">
      <div class="col-span-12 xl:col-span-8 relative">
        <div v-if="news.length" class="space-y-10 mb-6">
          <news-preview v-for="item in news" :key="item.ID" :news="item" />
        </div>

        <div v-else>
          <p>Не найдено ни одной новости</p>
        </div>

        <page-loader v-if="!isUpdated" />

        <app-pagination
          v-if="isPagination"
          :current="page"
          :countPages="countPages"
          @change="setPageHandler"
        />
      </div>
    </div>

    <page-loader v-if="!isNewsLoaded" />
    <app-page-error v-if="isError && isNewsLoaded" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { useCustomFetch } from "@/utils/fetch";
import axios from "axios";
import NewsPreview from "@/components/news/NewsPreview.vue";
import AppPageError from "@/components/AppPageError.vue";
import PageLoader from "@/components/loaders/PageLoader.vue";
import AppBreadcrumbs from "@/components/AppBreadcrumbs.vue";
import AppPagination from "@/components/AppPagination.vue";
import { useAppMessage } from "@/stores/appMessage";

const appMessageStore = useAppMessage();
const news = ref([]);
const isError = ref(false);
const isNewsLoaded = ref(false);
const isUpdated = ref(true);
const route = useRoute();
const page = ref(+route.query.page || 1);
const countPages = ref(1);

const setNewsParams = {
  filters: {
    category: {
      name: "Категория",
      all_filters: [],
      current_filters: [
        {
          ID: "21",
          name: "Новости",
          value: true,
        },
      ],
    },
  },
};

async function loadNews(page) {
  const urls = [
    "https://10.10.10.77:7168/api/post/news",
    "http://10.10.10.77:5168/api/post/news",
  ];

  try {
    // isNewsLoaded.value = false;
    const res = await axios({
      url: urls[1],
      method: "POST",
      withCredentials: true,
      data: { page: page, search: "", ...setNewsParams },
    });
    // console.log("NEWS", res);
    isError.value = false;
    news.value = res.data.items;
    countPages.value = res.data.all_pages_count;
    if (appMessageStore.isShow) {
      appMessageStore.close();
    }
  } catch (error) {
    console.log(error);
    isError.value = true;
    appMessageStore.open("error", "На странице произошла ошибка", "error");
  } finally {
    isNewsLoaded.value = true;
  }
}

const isPagination = computed(() => {
  return countPages.value > 1;
});

loadNews(page.value);

const breadcrumbs = [{ name: "Новости", url: "/about/news" }];

async function setPageHandler(p) {
  // console.log(page);
  isUpdated.value = false;
  page.value = p;

  const queryStr = `page=${page.value}`;

  window.history.pushState(
    null,
    document.title,
    `${window.location.pathname}?${queryStr}`
  );

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  await loadNews(page.value);
  isUpdated.value = true;
}
</script>
