<template>
  <div v-if="pageIsLoaded" class="search-page">
    <div class="container">
      <h1>
        По запросу «{{ $route.query.search }}» найдено:
        {{ categoryStore.productCount }}
        {{
          useNounEnding(
            categoryStore.productCount,
            "товар",
            "товара",
            "товаров"
          )
        }}
      </h1>

      <div v-if="!categoryStore.categoryProducts.length">
        <p>Товары не найдены</p>
      </div>

      <div v-else class="grid grid-cols-12 gap-6">
        <div class="col-span-4 xl:col-span-3">
          <div class="catalog-subcategory flex flex-col pb-4 border-b mb-6">
            <div class="text-2xl font-bold pb-4 mb-4 border-b">Категории</div>
            <div
              class="flex flex-col space-y-3 overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100"
            >
              <RouterLink
                class="text-gray-900 no-underline hover:text-primary pr-4"
                v-for="cat in mainStore.searchResultStore"
                :key="cat.tk_id"
                :to="{
                  path: `/catalog/${cat.tk_id}`,
                  query: { search: mainStore.searchValueStore },
                }"
              >
                {{ cat.tk_name }}
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="col-span-8 xl:col-span-9 relative">
          <page-loader v-if="!productsIsUpdated" />
          <catalog-product-list :products="categoryStore.categoryProducts" />

          <product-list-pagination
            @change="handleChangePage"
            v-if="categoryStore.pageCount > 1"
            :current="page"
          />
        </div>
      </div>
    </div>
  </div>
  <page-loader v-else />
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import CatalogProductList from "@/components/catalog/CatalogProductList.vue";
import { useCustomFetch } from "@/utils/fetch";
import PageLoader from "@/components/loaders/PageLoader.vue";
import { useCategoryStore } from "@/stores/category";
import ProductListPagination from "@/components/catalog/ProductListPagination.vue";
import { useMainStore } from "@/stores/main";
import { useNounEnding } from "@/utils/helpers";
import { useAppMessage } from "@/stores/appMessage";

const route = useRoute();
// const router = useRouter();
const categoryStore = useCategoryStore();
const mainStore = useMainStore();
const appMessage = useAppMessage();
/*
    apissz/setgoodsearch/?tn_id=…&tk_id=…&search=…&brend=…
    apissz/getGoodList/?page=…
*/
const page = ref(route.query.page ? Number(route.query.page) : 1);
const productsIsUpdated = ref(true);
const pageIsLoaded = ref(false);

async function setGoods() {
  try {
    await useCustomFetch(
      `apissz/setgoodsearch/?tk_id=0&tn_id=0&search=${route.query.search}`
    );
  } catch (error) {
    appMessage.open("error", "Произошла ошибка", "error");
  }
}

async function getProducts() {
  try {
    const res = await useCustomFetch(`apissz/getGoodList/?page=${page.value}`);
    if (res.success) {
      categoryStore.categoryProducts = res.data.ListGoods;
      categoryStore.pageCount = res.data.qty_pages;
      categoryStore.productCount = res.data.qty_records;
    }
  } catch (error) {
    appMessage.open("error", "Произошла ошибка", "error");
  }
}

// TODO: Добавить фильтры на страницу поиска
async function getFilters() {
  try {
    const res = await useCustomFetch("apissz/GetGoodFilters");
  } catch (error) {
    appMessage.open("error", "Произошла ошибка", "error");
  }
}

async function loadSearchPage() {
  const res = await useCustomFetch(
    `apissz//quicksearch/?search=${route.query.search}`
  );
  mainStore.searchResultStore = res.data;

  await setGoods();
  await getProducts();
  //   await getFilters();
  pageIsLoaded.value = true;
}

loadSearchPage();

async function handleChangePage(p) {
  productsIsUpdated.value = false;
  page.value = p;

  const queryStr = `search=${route.query.search}&page=${page.value}`;

  window.history.pushState(
    null,
    document.title,
    `${window.location.pathname}?${queryStr}`
  );

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  await getProducts(page.value);
  productsIsUpdated.value = true;
}
</script>
