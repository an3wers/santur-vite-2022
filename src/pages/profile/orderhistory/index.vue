<template>
  <div>
    <profile-page-wrapper title="История заказов">
      <div
        v-if="authStore.getIsAuth && profileStore.profile.name !== 'Гость'"
        class="space-y-6"
      >
        <!-- 
              Фильтры
              Поиск
              Листинг
              Постраничная навигация
             -->
        <orders-filters
          @onInput="searchHandler"
          @onRemoveSearchValue="removeSearchValueHandler"
          @onChangeTimeRange="changeTimeRangeHandler"
          @onChangeStatus="changeStatusHandler"
          @onCleanAllFilters="cleanAllFiltersHandler"
          @openModalWithProducts="openModalWithProductsHandler"
          :orderSearchValue="ordersParams.search"
          :timeRangeOptions="timeRangeOptions"
          :selectedTimeRange="selectedTimeRange"
          :statusOptions="statusOptions"
          :selectedStatus="ordersParams.state"
        />
        <orders-list
          v-if="isPageLoaded"
          :isLoaded="isLoadOrders"
          :orders="orders"
          :isOrderMergeMode="isOrderMergeMode"
        />
        <orders-pagination
          v-if="getIsPagination"
          :current="ordersParams.page"
          :countPages="pageCount"
          @change="setPageHandler"
        />
      </div>

      <profile-empty-state v-else />
    </profile-page-wrapper>

    <Teleport to="body">
      <app-modal
        @close="closeProductsModalHandler"
        modalSize="5xl"
        v-if="isModalProductsList"
      >
        <template #header> Товары готовые к отгрузке </template>
        <template #body>
          <!-- products -->
          <order-products-list />
        </template>
      </app-modal>
    </Teleport>
    <page-loader v-if="!isPageLoaded" />
  </div>
</template>

<script setup>
import ProfilePageWrapper from "@/components/profile/ProfilePageWrapper.vue";
import { useAuthStore } from "@/stores/auth";
import { useProfileStore } from "@/stores/profile";
import OrdersList from "@/components/profile/orderhistory/OrdersList.vue";
import OrdersFilters from "@/components/profile/orderhistory/OrdersFilters.vue";
import { ref, reactive, computed } from "vue";
import ProfileEmptyState from "@/components/profile/ProfileEmptyState.vue";
import { useAppMessage } from "@/stores/appMessage";
import OrdersPagination from "@/components/profile/orderhistory/OrdersPagination.vue";
import AppModal from "@/components/modal/AppModal.vue";
import PageLoader from "@/components/loaders/PageLoader.vue";
import orderProductsList from "@/components/profile/orderhistory/order/orderProductsList.vue";
import { useDate } from "@/utils/helpers";
import { useCustomFetch } from "@/utils/fetch";

//   definePageMeta({
//     pageTitle: 'История заказов'
//   })

const selectedTimeRange = ref("all");

const isModalProductsList = ref(false);

const timeRangeOptions = ref([
  { text: "За все время", value: "all" },
  { text: "За сегодня и вчера", value: "today_and_yesterday" },
  { text: "За неделю", value: "week" },
  { text: "За месяц", value: "month" },
]);

// const selectedStatus = ref('1')

const statusOptions = ref([]);

const OLDEST_DATE = new Date(2000, 0, 1);
const TODAY = new Date();

const appMessageStore = useAppMessage();

const profileStore = useProfileStore();
const authStore = useAuthStore();

const isLoadOrders = ref(false);
const isPageLoaded = ref(false);
const isOrderMergeMode = ref(false);

// default state
const orders = ref([]);
const pageCount = ref(1);
const ordersParams = reactive({
  ldate: useDate(OLDEST_DATE),
  rdate: useDate(TODAY),
  search: "",
  state: "1",
  authorId: 0,
  page: 1,
  qtyOnPage: 20,
  sort: "regdate_down",
});

const getIsPagination = computed(() => {
  return pageCount.value > 1;
});

async function loadOrders(params) {
  // apissz/GetOrders/?ldate=...&rdate=...&search=...&state=...&authorId=...&page=...&qtyOnPage=...

  // Получаю только заполненные поля в объекте
  // const query = Object.fromEntries(
  //   Object.entries(ordersParams).filter(([key, value]) => value)
  // )

  let query = Object.entries(ordersParams)
    .map((el) => el.join("="))
    .join("&");

  try {
    // const response = await useCustomFetch('apissz/GetOrders/', 'GET', query)
    // const response = await useCustomFetch('apissz/GetOrders/?' + query)
    const resp = await fetch("https://isantur.ru/apissz/GetOrders/?" + query, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const response = await resp.json();
    if (response.success) {
      orders.value = response.data.Orders;
      pageCount.value = response.data.qtyPages;
      ordersParams.rdate = response.data.rdate;
      ordersParams.state = response.data.state;
    } else {
      throw new Error("Ошибка при загрузке заказов");
    }
  } catch (error) {
    //   console.log(error)
    appMessageStore.openWithTimer(
      "error",
      "При загрузке заказов произошла ошибка",
      "error"
    );
  } finally {
    isPageLoaded.value = true;
    isLoadOrders.value = true;
  }
}

async function loadOrderStatuses() {
  try {
    const response = await useCustomFetch("apissz/GetOrderStatuses");
    if (response.success) {
      statusOptions.value = response.data;
    } else {
      throw new Error("Ошибка при загрузке статусов");
    }
  } catch (error) {
    console.log(error);
  }
}

loadOrders(ordersParams);
loadOrderStatuses();

async function setPageHandler(val) {
  ordersParams.page = val;
  isLoadOrders.value = false;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  await loadOrders(ordersParams);
  isLoadOrders.value = true;
}

const timer = ref(true);

// TODO: Сделать сброс поискового запросы, переделать поиск, убрать таймер

function searchHandler(event) {
  const tmp = event.trim();
  if (tmp || ordersParams.search) {
    if (timer.value) {
      clearTimeout(timer.value);
      timer.value = null;
    }

    isLoadOrders.value = false;
    timer.value = setTimeout(async () => {
      ordersParams.search = tmp;
      ordersParams.page = 1;
      await loadOrders(ordersParams);
      isLoadOrders.value = true;
    }, 1000);
  }
}

async function removeSearchValueHandler() {
  ordersParams.search = "";
  ordersParams.page = 1;
  isLoadOrders.value = false;
  await loadOrders(ordersParams);
  isLoadOrders.value = true;
}

async function changeTimeRangeHandler(event) {
  //
  const yesterday = new Date(TODAY.valueOf() - 1000 * 60 * 60 * 24);
  const lastWeek = new Date(TODAY.valueOf() - 1000 * 60 * 60 * 24 * 7);
  const lastMonth = new Date(TODAY.valueOf() - 1000 * 60 * 60 * 24 * 30);

  switch (event) {
    case "all":
      ordersParams.ldate = useDate(OLDEST_DATE);
      ordersParams.rdate = useDate(TODAY);
      selectedTimeRange.value = "all";
      break;

    case "today_and_yesterday":
      ordersParams.ldate = useDate(yesterday);
      ordersParams.rdate = useDate(TODAY);
      selectedTimeRange.value = "today_and_yesterday";
      break;
    case "week":
      ordersParams.ldate = useDate(lastWeek);
      ordersParams.rdate = useDate(TODAY);
      selectedTimeRange.value = "week";
      break;
    case "month":
      ordersParams.ldate = useDate(lastMonth);
      ordersParams.rdate = useDate(TODAY);
      selectedTimeRange.value = "month";
      break;

    default:
      ordersParams.ldate = useDate(OLDEST_DATE);
      ordersParams.rdate = useDate(TODAY);
      selectedTimeRange.value = "all";
      break;
  }
  // запрос
  isLoadOrders.value = false;
  await loadOrders(ordersParams);
  isLoadOrders.value = true;
}

async function changeStatusHandler(event) {
  // console.log('changeStatusHandler', event)
  ordersParams.state = event;
  ordersParams.page = 1;
  isLoadOrders.value = false;
  await loadOrders(ordersParams);
  isLoadOrders.value = true;
}

async function cleanAllFiltersHandler() {
  selectedTimeRange.value = "all";
  ordersParams.ldate = useDate(OLDEST_DATE);
  ordersParams.rdate = useDate(TODAY);
  ordersParams.state = "1";
  ordersParams.authorId = 0;
  isLoadOrders.value = false;
  await loadOrders(ordersParams);
  isLoadOrders.value = true;
}

function openModalWithProductsHandler() {
  isModalProductsList.value = true;
}

function closeProductsModalHandler(event) {
  // console.log(event);
  isModalProductsList.value = false;
}
</script>
