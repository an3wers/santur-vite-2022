<template>
  <div v-if="pageIsLoaded" class="search-page">
    <div class="container">
      <h1>
        По запросу «{{ $route.query.search }}» найдено:
        {{ categoryStore.productCount }} товаров
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
              <!-- :to="`/catalog/${cat.tk_id}`" -->
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

          <!-- <ul>
            <li v-for="item in mainStore.searchResultStore" :key="item.tk_id">
              {{ item.tk_name }}
            </li>
          </ul> -->
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

const route = useRoute();
const router = useRouter();
const categoryStore = useCategoryStore();
const mainStore = useMainStore();
/*
    apissz/setgoodsearch/?tn_id=…&tk_id=…&search=…&brend=…
    apissz/getGoodList/?page=…
*/
const page = ref(route.query.page ? Number(route.query.page) : 1);
// const pages = ref(0);
// const productsCount = ref(0);
// const products = ref([]);
const productsIsUpdated = ref(true);
const pageIsLoaded = ref(false);

async function setGoods() {
  try {
    await useCustomFetch(
      `apissz/setgoodsearch/?tk_id=0&tn_id=0&search=${route.query.search}`
    );
  } catch (error) {
    console.log(error.message);
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
    console.log(error.message);
  }
}

// TODO: Добавить фильтры на страницу поиска
async function getFilters() {
  try {
    const res = await useCustomFetch("apissz/GetGoodFilters");
    // console.log("Filters", res.data);
  } catch (error) {
    console.log(error.message);
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
  //   pushUrlState(getParamsUrl.value);
  // router.push({query: {...route.query, page:page.value}})
  // route.query.page = page.value
  // console.log(...route.query)
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
