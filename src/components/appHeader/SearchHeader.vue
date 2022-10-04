<template>
  <div class="header__search grow relative">
    <form @submit.prevent="searchRequestSubmit" class="relative">
      <input
        :value="searchValue"
        @input="searchHandler($event.target.value)"
        class="pl-4 pr-10 py-2.5 text-lg w-full rounded-md border form-input bg-transparent border-gray-300 focus:border-primary focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100 disabled:text-gray-500"
        type="text"
        placeholder="Найти товары"
        ref="searchInut"
        @blur="inputBlurHandler($event)"
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
      v-if="isResultSearch"
      class="absolute р-44 bg-white w-full shadow-lg px-2 py-6 z-10 rounded-b-lg"
    >
      <ul
        class="min-h-16 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200 scrollbar-thumb-rounded-md"
      >
        <li
          v-for="item in searchResult"
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
import {useRouter, useRoute} from 'vue-router'
import SearchIcon24 from "@/components/UI/Icons/SearchIcon_24.vue";
import AppButtonIcon from "@/components/UI/Buttons/AppButtonIcon.vue";
import CloseIcon24 from "@/components/UI/Icons/CloseIcon_24.vue";
import { useCustomFetch } from "@/utils/fetch";

// const props = defineProps(["searchValue", 'searchInput']);
// defineEmits(["onInput", "onClear", 'inputBlur']);

const router = useRouter()
const route = useRoute()

const searchValue = ref(route.query.search || '');
const searchResult = ref([]);
const searchInut = ref(null);
const isResultSearch = ref(false);


const isClearBtn = computed(() => {
  return !!searchValue.value;
});

// onMounted(() => {
//   console.log('searchInut', searchInut.value)
// })

function clearSearchHandler() {
  searchValue.value = "";
  searchResult.value = [];

console.log()

if(route.params.id) {
  router.push({path: `/catalog/${route.params.id}`, query:null})
}

}

function inputBlurHandler(event) {
  // console.log(event)
  // console.log('Blur')
  
  const tmr = setTimeout(() => {
    
    isResultSearch.value = false;
    clearTimeout(tmr)
  }, 300)

}

function inputFocusHandler() {
  if (searchValue.value && searchResult.value.length) {
    isResultSearch.value = true;
  }
}

const timer = ref(true);

function searchHandler(value) {
  searchValue.value = value.trim();

  /*
  apissz/quicksearch/?search=…
  https://isantur.ru/apissz/setgoodsearch?tk_id=892833&search=труба
  
  */
  // console.log(evt)
  /*
    Если произвольный запрос, то роутинг на страницу search
    Роутинг в категорию
  */

  if (searchValue.value) {
    isResultSearch.value = true;

    if (timer.value) {
      clearTimeout(timer.value);
      timer.value = null;
    }

    timer.value = setTimeout(async () => {
      try {
        const res = await useCustomFetch(
          `apissz//quicksearch/?search=${searchValue.value}`
        );

        if (res.success) {
          searchResult.value = res.data;
          console.log(res.data);
        } else {
          throw new Error(res.message || "При поиски произошла ошибка");
        }
      } catch (error) {
        console.log(error);
      }

      clearTimeout(timer.value);
    }, 1000);
  }
}
 
function searchRequestSubmit() {
  if(searchValue.value) {
    console.log('searchRequestSubmit', searchValue.value)
  }
}

function routeHandler(id) {
  console.log(123)
  router.push({path: `/catalog/${id}`, query:{search: searchValue.value}})
}

</script>
