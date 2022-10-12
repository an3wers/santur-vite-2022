<template>
  <app-page-error v-if="!catalogStore.getProductCatalog.length" />
  <div v-else class="catalog-list">
    <div
      class="grid gap-x-6 gap-y-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div
        v-for="cat of getCatalogList"
        :key="cat.id"
        class="catalog-list__item space-y-3"
      >
        <div class="catalog-list__title font-semibold text-lg">
          <RouterLink
            class="no-underline text-gray-900 hover:text-primary"
            :to="`/catalog/${cat.id}`"
            >{{ cat.name }}</RouterLink
          >
        </div>
        <catalog-list-subcategory :childs="cat.child" />
      </div>
    </div>
  </div>
</template>

<script setup>
import AppPageError from "@/components/AppPageError.vue";
import CatalogListSubcategory from "@/components/catalog/CatalogListSubcategory.vue";
import { ref, computed } from "vue";
import { useCatalogStore } from "@/stores/catalog";

const catalogStore = useCatalogStore();

const getCatalogList = computed(() => {
  const firstLeveArr = catalogStore.getProductCatalog
    .filter((el) => el.parent_id == 0)
    .map((fel) => {
      return { ...fel, child: [] };
    });

  catalogStore.getProductCatalog.forEach((el) => {
    if (el.parent_id !== 0) {
      const obj = firstLeveArr.find((o) => o.id === el.parent_id);
      obj.child.push(el);
    }
  });

  if (catalogStore.getProductCatalog.length > 0) {
    return firstLeveArr;
  } else {
    return [];
  }
});
</script>
