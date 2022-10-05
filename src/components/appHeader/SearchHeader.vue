<template>
  <div class="header__search grow relative">
    <form @submit.prevent="searchRequestSubmit" class="relative">
      <input
        :value="$route.query.search || mainStore.searchValueStore"
        @input="searchHandler($event.target.value)"
        class="pl-4 pr-10 py-2.5 text-lg w-full rounded-md border form-input bg-transparent border-gray-300 focus:border-primary focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100 disabled:text-gray-500"
        type="text"
        placeholder="Найти товары"
        @blur="inputBlurHandler"
        @focus="inputFocusHandler"
      />
      <!-- <button class="absolute search-icon"><search-icon-24 color="#1976D2" /></button> -->
      <span
        v-if="isClearBtn"
        @click="clearSearchHandler"
        class="absolute right-[64px] top-[13px] cursor-pointer"
      >
        <close-icon-24 color="#6b7280" />
      </span>
      <app-button-icon type="submit" class="absolute search-icon"
        ><search-icon-24 color="#ffffff"
      /></app-button-icon>
    </form>
    <!-- search results -->
    <div
      v-if="mainStore.searchResultStore.length && isResultSearch"
      class="absolute р-44 bg-white w-full shadow-lg px-2 py-6 z-10 rounded-b-lg"
    >
      <ul
        class="min-h-16 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200 scrollbar-thumb-rounded-md"
      >
        <li
          v-for="item in mainStore.searchResultStore"
          @click="routeHandler(item.tk_id)"
          class="py-2 px-2 block rounded-md hover:bg-slate-100 hover:text-primary mr-2 cursor-pointer"
        >
          {{ item.tk_name }}
        </li>
      </ul>
    </div>
    <!-- # search results -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import SearchIcon24 from "@/components/UI/Icons/SearchIcon_24.vue";
import AppButtonIcon from "@/components/UI/Buttons/AppButtonIcon.vue";
import CloseIcon24 from "@/components/UI/Icons/CloseIcon_24.vue";
import { useCustomFetch } from "@/utils/fetch";
import { useMainStore } from "@/stores/main";

// const props = defineProps(["searchValue", 'searchInput']);
// defineEmits(["onInput", "onClear", 'inputBlur']);

const router = useRouter();
const route = useRoute();
const mainStore = useMainStore();

mainStore.searchValueStore = route.query.search || "";

// const searchValue = ref(route.query.search || '');
// const searchResult = ref([]);
// const searchInut = ref(null);

const isResultSearch = ref(false);
// const isSearching = ref(fasle)

const isClearBtn = computed(() => {
  return route.query.search || mainStore.searchValueStore;
});

function clearSearchHandler() {
  // searchValue.value = "";
  // searchResult.value = [];
  
  if (route.params.id) {
    router.push({ path: `/catalog/${route.params.id}`, query: null });
  }
  if (route.path === "/search") {
    router.push({ path: "/", query: null });
  }
  mainStore.searchValueStore = "";
  mainStore.searchResultStore = [];
}

function inputBlurHandler() {
  const tmr = setTimeout(() => {
    isResultSearch.value = false;
    clearTimeout(tmr);
  }, 100);
}

function inputFocusHandler() {
  // if (searchValue.value && searchResult.value.length) {
  if (mainStore.searchValueStore && mainStore.searchResultStore.length) {
    isResultSearch.value = true;
  }
}

const timer = ref(true);

function searchHandler(value) {
  // searchValue.value = value.trim();
  mainStore.searchValueStore = value.trim();

  /*
  apissz/quicksearch/?search=…
  https://isantur.ru/apissz/setgoodsearch?tk_id=892833&search=труба
  
  */
  /*
    Если произвольный запрос, то роутинг на страницу search
    Роутинг в категорию
  */

  // if (searchValue.value) {
  if (mainStore.searchValueStore) {
    isResultSearch.value = true;

    if (timer.value) {
      clearTimeout(timer.value);
      timer.value = null;
    }

    timer.value = setTimeout(async () => {
      try {
        // const res = await useCustomFetch(
        //   `apissz//quicksearch/?search=${searchValue.value}`
        // );
        const res = await useCustomFetch(
          `apissz//quicksearch/?search=${mainStore.searchValueStore}`
        );

        if (res.success) {
          // searchResult.value = res.data;
          mainStore.searchResultStore = res.data;
          // console.log(res.data);
        } else {
          throw new Error(res.message || "При поиски произошла ошибка");
        }
      } catch (error) {
        console.log(error);
      }

      clearTimeout(timer.value);
    }, 700);
  }
}

async function searchRequestSubmit() {
  // if (searchValue.value) {
  //   console.log("searchRequestSubmit", searchValue.value);
  // }

  if (mainStore.searchValueStore) {
    router.push({
      path: "/search",
      query: { search: mainStore.searchValueStore },
    });
    isResultSearch.value = false;

    // const res = await useCustomFetch(
    //       `apissz//quicksearch/?search=${mainStore.searchValueStore}`
    //     );
    // if(res.success) {
    //   mainStore.searchResultStore = res.data;
    // }
  }
}

function routeHandler(id) {
  // router.push({path: `/catalog/${id}`, query:{search: searchValue.value}})
  router.push({
    path: `/catalog/${id}`,
    query: { search: mainStore.searchValueStore },
  });
}
</script>
