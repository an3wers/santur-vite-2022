<template>
  <div class="container">
    <h1>Новости</h1>
    <ul>
      <li></li>
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { useCustomFetch } from "@/utils/fetch";
import axios from "axios";

const route = useRoute();

const page = ref(+route.query.page || 1);

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

async function loadNews() {
  try {
    const res = await axios({
      url: "http://10.10.10.77:5168/api/post/news",
      method: "POST",
      withCredentials: true,
      data: { page: page.value, search: "", ...setNewsParams },
    });

    console.log("NEWS", res);
  } catch (error) {
    console.log(error);
  }
}

loadNews();
</script>
