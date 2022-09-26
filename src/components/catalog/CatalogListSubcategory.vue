<template>
  <div class="catalog-list__body" v-for="item in filtered" :key="item.id">
    <RouterLink
      class="no-underline text-gray-900 hover:text-primary"
      :to="`/catalog/${item.id}`"
      >{{ item.name }}</RouterLink
    >
  </div>
  <div>
    <app-button
      v-if="childs.length > 5"
      btnType="link"
      class="-ml-3"
      @click="handleView"
      >{{ !viewAll ? "Показать все" : "Скрыть" }}</app-button
    >
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import AppButton from "@/components/UI/Buttons/AppButton.vue";

const props = defineProps({
  childs: {
    type: Array,
  },
});

const viewAll = ref(false);

function handleView() {
  viewAll.value = !viewAll.value;
}

const filtered = computed(() => {
  return viewAll.value ? props.childs : props.childs.filter((el, i) => i < 5);
});
</script>
