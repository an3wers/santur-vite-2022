<template>
  <div v-if="categoryIsLoaded" class="category-page">
    <div class="container">
      <app-breadcrumbs :breadcrumbs="getBreadcrumbs" />
      <div class="inline-flex space-x-2">
        <h1>
          {{ getCatalogTitle }}
        </h1>
        <span class="text-gray-400 text-3xl font-bold"
          >({{ categoryStore.productCount }})</span
        >
      </div>

      <app-page-error v-if="mainStore.pageError" />

      <div v-else class="grid grid-cols-12 gap-6">
        <div class="col-span-3">
          <div v-if="getIsTn">
            <catalog-subcategory :subcategory="getSubcatgory" />
          </div>
          <catalog-filter-list
            @handleFilter="handleFilter"
            @cleanAll="handleCleanAll"
            @changeMaxLimitPrice="handleChangeMaxLimitPrice"
            @changeMinLimitPrice="handleChangeMinLimitPrice"
            @resetPrice="handleResetPrice"
            :filters="categoryStore.categoryFilters"
          />
        </div>
        <div class="col-span-9 relative">
          <!-- TODO:  mainStore.pageLoader тут не нужен mainStore-->
          <page-loader v-if="!categoryIsUpdated" />

          <div>
            <!-- Сортировка -->

            <!-- <catalog-sort :incash="inCash" :orderby="orderBy" /> -->
            <catalog-sort
              @changeSort="handleChangeSort"
              @changeInCash="handleChangeInCash"
            />

            <catalog-product-chips @cleanFilter="handleChip" />

            <catalog-product-list :products="categoryStore.categoryProducts" />

            <div
              v-if="!categoryStore.categoryProducts.length"
              class="text-center py-20"
            >
              <p>Товары не найдены</p>
            </div>

            <product-list-pagination
              @change="handleChangePage"
              v-if="categoryStore.pageCount > 1"
              :current="page"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <page-loader v-else />
</template>

<script setup>
import AppPageError from "@/components/AppPageError.vue";
import CatalogProductList from "@/components/catalog/CatalogProductList.vue";
import CatalogFilterList from "@/components/catalog/CatalogFilterList.vue";
import CatalogSubcategory from "@/components/catalog/CatalogSubcategory.vue";
import { useRoute, useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { useCatalogStore } from "@/stores/catalog";
import { useCategoryStore } from "@/stores/category";
import { useMainStore } from "@/stores/main";
import ProductListPagination from "@/components/catalog/ProductListPagination.vue";
import AppBreadcrumbs from "@/components/AppBreadcrumbs.vue";
import CatalogProductChips from "@/components/catalog/CatalogProductChips.vue";
import CatalogSort from "@/components/catalog/CatalogSort.vue";
import PageLoader from "@/components/loaders/PageLoader.vue";

const categoryIsLoaded = ref(false);
const categoryIsUpdated = ref(true);

const route = useRoute();
const router = useRouter();

const catalogStore = useCatalogStore();
const categoryStore = useCategoryStore();
const mainStore = useMainStore();

const page = ref(route.query.page ? Number(route.query.page) : 1);

const currentCat = computed(() => {
  return catalogStore.getProductCatalog.find(
    (el) => el.id === +route.params.id
  );
});

const getIsTn = computed(() => {
  return currentCat.value.vid === "tn";
});

const getSubcatgory = computed(() => {
  return catalogStore.getProductCatalog.filter(
    (el) => el.parent_id === +route.params.id
  );
});

const getCatalogTitle = computed(() => {
  if (!!currentCat.value) {
    return currentCat.value.name;
  } else {
    return "";
  }
});

const getParams = computed(() => {
  //   console.log(currentCat.value);
  if (currentCat.value.parent_id === 0) {
    // return `?tn_id=${currentCat.value.id}&tk_id=0`
    return `?tn_id=${currentCat.value.id}`;
  } else {
    // return `?tn_id=${currentCat.value.parent_id}&tk_id=${currentCat.value.id}`
    return `?tk_id=${currentCat.value.id}`;
  }
});

const getParamsUrl = computed(() => {
  const queryObj = {};

  if (categoryStore.setedFilters.length) {
    queryObj.filter = categoryStore.setedFilters;
  }

  if (page.value !== 1) {
    queryObj.page = page.value;
  }

  if (categoryStore.setedFiltersPrice.length) {
    queryObj.price = categoryStore.setedFiltersPrice;
  }

  if (categoryStore.inCash) {
    queryObj.incash = 'true'
  }

  // return { filter: categoryStore.setedFilters, page: page.value, price: categoryStore.setedFiltersPrice }
  return queryObj;
});

const getBreadcrumbs = computed(() => {
  // Если направление
  if (currentCat.value.parent_id == 0) {
    return [
      { name: "Каталог", url: "/catalog" },
      { name: currentCat.value.name, url: `/catalog/${currentCat.value.id}` },
    ];
  } else {
    return [
      { name: "Каталог", url: "/catalog" },
      {
        name: currentCat.value["parent_name"],
        url: `/catalog/${currentCat.value["parent_id"]}`,
      },
      { name: currentCat.value.name, url: currentCat.value.id },
    ];
  }
});

async function loadCategory() {
  // console.log('route.query', Object.entries(route.query))


  const tmpPrices = Object.entries(route.query).find((el) => el[0] === "price");
  const tmpIncash = Object.entries(route.query).find((el) => el[0] === "incash");

  await categoryStore.setCategory(getParams.value);

  //   console.log(route.query)
  //   console.log(Object.keys(route.query))

  if (
    Object.keys(route.query).filter((el) => el !== "page" && el !== "price" && el !== "incash")
      .length
  ) {
    await categoryStore.setFilters(route);
  } else {
    await categoryStore.cleanAllFilter();
  }

  if (tmpPrices) {

    let minVal = 0
    let maxVal = 0

    tmpPrices[1].split("_").forEach((el) => {
      if (el.split(":")[0] === "minprice") {
        minVal = el.split(":")[1];
        // categoryStore.setMinLimit(`?flt=Цена&val=${val}`);
      }
      if (el.split(":")[0] === "maxprice") {
        maxVal = el.split(":")[1];
        // categoryStore.setMaxLimit(`?flt=Цена&val=${val}`);
      }
    });

    if(minVal) {
        await categoryStore.setMinLimit(`?flt=Цена&val=${minVal}`);
    }
    if(maxVal) {
        await categoryStore.setMaxLimit(`?flt=Цена&val=${maxVal}`);
    }

  }

  if(tmpIncash || categoryStore.inCash) {
    await categoryStore.setInCash('Y');
  } else {
    await categoryStore.setInCash('N');
  }

  await categoryStore.loadProducts(page.value);

  categoryIsLoaded.value = true;
}

loadCategory();

function pushUrlState(payload) {
  let result = [];

  Object.entries(payload).forEach((el, index, arr) => {
    if (el[0] === "filter") {
      result.push(el[1].join("&"));
    }
    if (el[0] === "page") {
      result.push(`${el[0]}=${el[1]}`);
    }
    if (el[0] === "price") {
      result.push(`${el[0]}=${el[1].join("_")}`);
    }
    if(el[0] === "incash") {
        result.push(`${el[0]}=${el[1]}`);
    }
  });

  window.history.pushState(
    null,
    document.title,
    `${window.location.pathname}?${result.join("&")}`
  );
}

// Клик на чекбокс
async function handleFilter(filter) {
  categoryIsUpdated.value = false;
  page.value = 1;

  await categoryStore.setFilter(`?flt=${filter.name}&item=${filter.value}`);
  await categoryStore.loadProducts(page.value);

  if (filter.isChecked) {
    catalogStore.setDisplaySelectedFilterBtn();
  }
  pushUrlState(getParamsUrl.value);
  categoryIsUpdated.value = true;
}

async function handleChip(chip) {
  categoryIsUpdated.value = false;
  page.value = 1;

  if (chip.name == "price") {
    // сбросить фильтр по цене
    // метод remove set price
    await handleResetPrice("Цена", chip.type);
  } else {
    // toggle
    await categoryStore.setFilter(`?flt=${chip.name}&item=${chip.value}`);
    await categoryStore.loadProducts(page.value);
  }

  pushUrlState(getParamsUrl.value);
  categoryIsUpdated.value = true;
}

async function handleCleanAll() {
  categoryIsUpdated.value = false;
  page.value = 1;

  await categoryStore.cleanAllFilter();
  // Очищать все цены
  await categoryStore.loadProducts(page.value);

  pushUrlState(getParamsUrl.value);
  categoryIsUpdated.value = true;
}

async function handleChangePage(p) {
  categoryIsUpdated.value = false;
  page.value = p;
  pushUrlState(getParamsUrl.value);
  await categoryStore.loadProducts(page.value);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  categoryIsUpdated.value = true;
}

// TODO: Рефакторинг этих функций

async function handleChangeMaxLimitPrice(value, name) {
  categoryIsUpdated.value = false;
  page.value = 1;

  await categoryStore.setMaxLimit(`?flt=${name}&val=${value}`);
  //   await categoryStore.setMaxLimit(`?flt=${name}&item=${value}`);
  await categoryStore.loadProducts(page.value);

  pushUrlState(getParamsUrl.value);
  categoryIsUpdated.value = true;
}

async function handleChangeMinLimitPrice(value, name) {
  categoryIsUpdated.value = false;
  page.value = 1;

  await categoryStore.setMinLimit(`?flt=${name}&val=${value}`);
  //   await categoryStore.setMinLimit(`?flt=${name}&item=${value}`);
  await categoryStore.loadProducts(page.value);

  pushUrlState(getParamsUrl.value);
  categoryIsUpdated.value = true;
}

async function handleResetPrice(name, type) {
  categoryIsUpdated.value = false;
  page.value = 1;

  await categoryStore.removeLimit(name, type);
  await categoryStore.loadProducts(page.value);

  pushUrlState(getParamsUrl.value);
  categoryIsUpdated.value = true;
}

async function handleChangeSort(value) {
  // console.log('Сортировка в родительском компоненте: ', value)

  categoryIsUpdated.value = false;
  page.value = 1;

  await categoryStore.setSort(value);
  await categoryStore.loadProducts(page.value);
  pushUrlState(getParamsUrl.value);
  categoryIsUpdated.value = true;
}

async function handleChangeInCash(value) {
  const tmp = value ? "Y" : "N";

  categoryIsUpdated.value = false;
  page.value = 1;

  await categoryStore.setInCash(tmp);
  await categoryStore.loadProducts(page.value);
  
  pushUrlState(getParamsUrl.value);
  categoryIsUpdated.value = true;
}
</script>
