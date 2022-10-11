<template>
  <div class="news-preview">
    <RouterLink
      class="news-preview__link no-underline text-gray-900 hover:text-primary"
      :to="`/about/news/${news.ID}`"
    >
      <div class="font-medium text-gray-500 mb-1">
        {{ useDateFormatter(news.post_date) }}
      </div>
      <div class="font-medium text-xl mb-2">
        {{ news.post_title }}
      </div>
      <div v-if="news.post_description" class="text-gray-900">
        <div v-html="news.post_description"></div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { useDateFormatter } from "@/utils/helpers";

const props = defineProps({
  news: {
    type: Object,
    required: true,
  },
});
</script>
