<template>
  <div class="container">
    <div class="post-wrapper" v-if="postIsLoaded && !isError">
      <app-breadcrumbs :breadcrumbs="breadcrumbs" />
      <h1>{{ post.post_title }}</h1>
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 xl:col-span-8">
          <div v-html="getContent"></div>
          <!-- {{ getContent }} -->
        </div>
      </div>
    </div>
    <page-loader v-if="!postIsLoaded" />
    <app-page-error v-if="isError && postIsLoaded" />
  </div>
</template>

<script setup>
import axios from "axios";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppPageError from "@/components/AppPageError.vue";
import PageLoader from "@/components/loaders/PageLoader.vue";
import AppBreadcrumbs from "@/components/AppBreadcrumbs.vue";

const route = useRoute();
const router = useRouter();
const postIsLoaded = ref(false);
const isError = ref(false);
const post = ref(null);

async function loadPost(id) {
  try {
    postIsLoaded.value = false;
    // https://localhost:7168/api/post/detail {"ID":4}
    const res = await axios({
      url: "http://10.10.10.77:5168/api/post/detail",
      method: "POST",
      withCredentials: true,
      data: { ID: id },
    });

    if (res.data.data) {
      post.value = res.data.data;
      isError.value = false;
      console.log("POST", res);
    } else {
      router.push({ name: "NotFound" });
    }
  } catch (error) {
    console.log(error);
    isError.value = true;
  } finally {
    postIsLoaded.value = true;
  }
}

loadPost(route.params.id);

const getContent = computed(() => {
  return post.value.post_content.replace(/\\\\r|\\\\n|\\\\t|\\n|\\t|\\r/g, "");
});

const breadcrumbs = [{ name: "Новости", url: "/about/news" }, {}];
</script>
