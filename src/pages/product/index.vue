<template>
  <div v-if="productIsLoaded" class="product-page">
    <div class="container">
      <app-breadcrumbs
        v-if="!Object.keys($route.query).length"
        :breadcrumbs="getBreadcrumbsProduct"
      />
      <!-- {{ Object.keys($route.query) }} -->
      <app-go-back v-else />
      <h1>{{ product.name }}</h1>

      <div class="flex items-start justify-between space-x-4 mb-6">
        <!-- code, art and nav -->
        <div
          class="text-sm text-gray-500 flex items-start justify-between space-x-4"
        >
          <div>Код товара: {{ product.code }}</div>
          <div v-if="product.article.length">
            Артикул: {{ product.article }}
          </div>
        </div>
      </div>

      <!-- Start product detail -->
      <!-- TODO: Вынести product detail в компонент -->

      <div class="grid grid-cols-12 gap-6">
        <div class="col-start-1 col-span-7 col-end-8">
          <div class="grid grid-cols-2 gap-6">
            <div class="">
              <!-- Product image -->
              <div class="w-full aspect-square overflow-hidden">
                <img
                  class="w-full h-full object-contain"
                  :src="product.imgpath"
                  :alt="product.name"
                />
              </div>
            </div>
            <div class="">
              <!-- Product characteristic -->
              <div class="font-bold text-lg mb-4">Характеристики</div>
              <ul class="list-none divide-y">
                <li
                  v-for="item in getTopCharacteristics"
                  :key="item.Name"
                  class="py-3 first:pt-0 last:pb-0 flex justify-between items-start space-x-3"
                >
                  <span class="text-gray-500">{{ item.Name }}</span>
                  <span class="text-right">{{ item.Value }}</span>
                </li>
              </ul>
              <div class="mt-4">
                <app-button
                  btnType="secondary"
                  @click="handleAllCharacteristics"
                  btnSize="md"
                  >Все характеристики</app-button
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col-start-9 col-span-4 col-end-13">
          <div class="flex-col space-y-6">
            <!-- Если не авторизован -->

            <app-informer type="primary" v-if="!authStore.user.id">
              <p>
                <a @click.prevent="handleSignIn" href="#">Войдите</a> в профиль
                для получения персональных цен.
              </p>
            </app-informer>

            <div class="inline-flex items-baseline">
              <!-- Цена -->
              <span class="text-2xl font-bold">{{ product.prices }} ₽</span>
              <span class="text-gray-500 ml-1">/{{ product.ed }}</span>
            </div>
            <div class="flex justify-between items-end">
              <!-- Выбор количества и добавление в избранные -->
              <!-- TODO: Выбор количества вынести в компонент -->

              <div>
                <span class="inline-block text-sm text-gray-500 mb-1"
                  >Выбрать количество</span
                >
                <div class="relative flex items-center">
                  <button
                    :disabled="!isRemoveBtnCount"
                    @click="changeCountHandler('remove')"
                    class="absolute left-3 disabled:opacity-50"
                    aria-label="Уменьшить количество"
                  >
                    <remove-icon-24 />
                  </button>
                  <input
                    type="number"
                    class="rounded-md border w-52 form-input bg-transparent border-gray-300 focus:border-primary focus:ring focus:ring-blue-200 focus:ring-opacity-50 py-2.5 text-lg text-center px-8"
                    :step="product.salekrat"
                    :placeholder="product.salekrat"
                    :min="product.salekrat"
                    :max="MAXPRODUCT_COUNT"
                    v-model="selectedValue"
                    name="Количество товара"
                    @blur="setProductValue"
                    @keypress.enter="$event.target.blur()"
                  />
                  <button
                    :disabled="!isAddBtnCount"
                    class="disabled:opacity-50 absolute right-3"
                    aria-label="Добавить количество"
                    @click="changeCountHandler('add')"
                  >
                    <plus-icon-24 />
                  </button>
                </div>
              </div>

              <div>
                <!-- В избранное isfavority-->

                <app-button-icon
                  v-if="!getIsFavority"
                  @click="addFavoritiesHandler"
                  btnType="secondary"
                  btnSize="lg"
                >
                  <bookmark-icon-24 color="#6b7280" />
                </app-button-icon>
                <button
                  v-else
                  @click="removeFavoritiesHandler"
                  class="py-3 text-lg px-4 inline-flex items-center text-center justify-center rounded-md disabled:opacity-75 bg-blue-100 border border-transparent hover:bg-blue-200 focus:outline-none focus:ring-slate-500 focus:ring focus:ring-opacity-20 text-gray-600"
                >
                  <bookmark-icon-fill-24 color="#1976D2" />
                </button>
              </div>
            </div>
            <div>
              <app-button
                v-if="!getIsAddedCart"
                @click="handleToCart"
                class="w-full"
                btnSize="lg"
                btnType="primary"
              >
                <svg
                  v-if="isBtnSpinner"
                  role="status"
                  class="inline mr-3 w-4 h-4 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Добавить в козину
                {{ selectedValue || product.salekrat }}
                {{ product.ed }}
              </app-button>

              <RouterLink
                to="/cart"
                class="no-underline w-full inline-flex items-center text-center justify-center rounded-md disabled:opacity-75 py-2.5 text-lg px-4 border border-transparent bg-blue-100 hover:bg-blue-200 focus:ring-slate-500 focus:ring focus:ring-opacity-20 text-gray-600 hover:text-gray-600"
                v-else
              >
                <!-- Иконка -->
                <check-icon-24 color="#16a34a" />
                <span class="ml-1">В корзине</span>
              </RouterLink>
            </div>
            <div
              class="inline-flex space-x-1"
              v-if="product.incash_info === 'В наличии'"
            >
              <check-circle-24 color="#16a34a" />
              <span class="text-base text-secondary-text"
                >{{ product.incash_info }}: {{ product.incash }}
                {{ product.ed }}.</span
              >
            </div>
            <div
              class="inline-flex space-x-1"
              v-else-if="product.incash_info === 'Под заказ'"
            >
              <schedule-icon-24 color="#9ca3af" />
              <span class="text-base text-secondary-text">{{
                product.incash_info
              }}</span>
            </div>

            <div class="inline-flex space-x-1" v-else>
              <shipping-icon-24 color="#9ca3af" />
              <span class="text-base text-secondary-text">{{
                product.incash_info
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- End product detail -->

      <!-- Start product descr -->

      <product-descr
        @onClickTab="tabHandler"
        :sections="tabMenuSections"
        :characteristics="characteristics"
        :current="currentSection"
      />

      <!-- End product descr -->
    </div>
  </div>

  <PageLoader v-else />

</template>
<script setup>
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";
import AppBreadcrumbs from "@/components/AppBreadcrumbs.vue";
import { useCatalogStore } from "@/stores/catalog";
import AppButton from "@/components/UI/Buttons/AppButton.vue";
import AppButtonIcon from "@/components/UI/Buttons/AppButtonIcon.vue";
import { useAuthStore } from "@/stores/auth";
import ProductDescr from "@/components/product/ProductDescr.vue";
import CheckCircle24 from "@/components/UI/Icons/CheckCircle_24.vue";
import ScheduleIcon24 from "@/components/UI/Icons/ScheduleIcon_24.vue";
import ShippingIcon24 from "@/components/UI/Icons/ShippingIcon_24.vue";
import BookmarkIcon24 from "@/components/UI/Icons/BookmarkIcon_24.vue";
import PlusIcon24 from "@/components/UI/Icons/PlusIcon_24.vue";
import RemoveIcon24 from "@/components/UI/Icons/RemoveIcon_24.vue";
import AppInformer from "@/components/AppInformer.vue";
import CheckIcon24 from "@/components/UI/Icons/CheckIcon_24.vue";
import { useProfileStore } from "@/stores/profile";
import BookmarkIconFill24 from "@/components/UI/Icons/BookmarkIconFill_24.vue";
import AppGoBack from "@/components/AppGoBack.vue";
import { useToFixedNumber, setCountProduct } from "@/utils/helpers";
import { useCustomFetch } from "@/utils/fetch";
import PageLoader from '@/components/loaders/PageLoader.vue'
import { useCartStore } from "@/stores/cart";

const productIsLoaded = ref(false);

const authStore = useAuthStore();
const catalogStore = useCatalogStore();
const route = useRoute();
const productId = route.params.id;
const cartStore = useCartStore();

const profileStore = useProfileStore();

const product = ref({});
const characteristics = ref([]);
const MAXPRODUCT_COUNT = 10000;

const isAddedCart = ref(false);

const isBtnSpinner = ref(false);

const getIsAddedCart = computed(() => {
  return isAddedCart.value;
});

const getIsFavority = computed(() => {
  return product.value.isfavority;
});

const selectedValue = ref(null);

const currentSection = ref("characteristics");

const tabMenuSections = ref([
  {
    name: "Характеристики",
    alias: "characteristics",
    enable: false,
  },
  {
    name: "Описание",
    alias: "description",
    enable: false,
  },
  {
    name: "Комплектующие",
    alias: "accessories",
    enable: false,
  },
  { name: "Аналоги", alias: "analogues", enable: false },
  { name: "Документы", alias: "documents", enable: false },
]);

const timer = ref(true);

async function changeCountHandler(param) {
  if (param == "add") {
    selectedValue.value =
      useToFixedNumber(selectedValue.value) + product.value.salekrat;

    selectedValue.value = useToFixedNumber(selectedValue.value);
  } else if (param == "remove") {
    selectedValue.value =
      useToFixedNumber(selectedValue.value) - product.value.salekrat;
    selectedValue.value = useToFixedNumber(selectedValue.value);
  }

  // Тут делать запрос на добавление в корзину
  if (isAddedCart.value) {
    if (timer.value) {
      clearTimeout(timer.value);
      timer.value = null;
    }
    timer.value = setTimeout(async () => {
      if (selectedValue.value > 0) {
        const res = await cartStore.changeCount(
          product.value.code,
          selectedValue.value
        );
        if (res instanceof Error || res == undefined) {
          console.log("Error: ", res);
        } else {
          isBtnSpinner.value = true;
          await cartStore.getShortCart();
          isBtnSpinner.value = false;
          product.value.qty_incart = selectedValue.value;
        }
      } else if (selectedValue.value == 0) {
        // удаление из корзины

        const res = await cartStore.removeFromCart(product.value.code);
        if (res instanceof Error || res == undefined) {
          console.log("Error", res);
        } else {
          await cartStore.getShortCart();
          isAddedCart.value = false;
          selectedValue.value = product.value.salekrat;
          product.value.qty_incart = 0;
        }
      }
    }, 800);
  } else if (!isAddedCart.value && selectedValue.value == 0) {
    selectedValue.value = product.value.salekrat;
  }
}

const isRemoveBtnCount = computed(() => {
  return selectedValue.value > 0;
});

const isAddBtnCount = computed(() => {
  return selectedValue.value < MAXPRODUCT_COUNT;
});

async function setProductValue() {
  selectedValue.value = setCountProduct(
    selectedValue.value,
    MAXPRODUCT_COUNT,
    product.value.salekrat
  );

  if (isAddedCart.value) {
    if (product.value.qty_incart != selectedValue.value) {
      if (selectedValue.value > 0) {
        const res = await cartStore.addToCart(
          product.value.code,
          selectedValue.value
        );
        if (res instanceof Error || res == undefined) {
          console.log("Error: ", res);
        } else {
          isBtnSpinner.value = true;
          await cartStore.getShortCart();
          isBtnSpinner.value = false;
          product.value.qty_incart = selectedValue.value;
        }
      } else if (selectedValue.value == 0) {
        // Удлаить из корзины
        const res = await cartStore.removeFromCart(product.value.code);
        if (res instanceof Error || res == undefined) {
          console.log("Error", res);
        } else {
          await cartStore.getShortCart();
          isAddedCart.value = false;
          selectedValue.value = product.value.salekrat;
          product.value.qty_incart = 0;
        }
      }
    }
  }
}

async function loadProduct(id) {
  try {
    const response = await useCustomFetch(`apissz/GetGoodCart/?gcode=${id}`);

    if (response.success == true) {
      product.value = response.data;
      selectedValue.value = response.data.salekrat; // ?

      if (response.data.qty_incart) {
        isAddedCart.value = true;
        selectedValue.value = response.data.qty_incart;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function loadCharacteristics(id) {
  try {
    const response = await useCustomFetch(`apissz/GetGoodChars/?gcode=${id}`);

    if (response.success == true) {
      characteristics.value = response.data;
      const tmp = tabMenuSections.value.find(
        (el) => el.alias === "characteristics"
      );
      tmp.enable = true;
    }
  } catch (error) {
    console.log(error);
  }
}

async function setProduct() {
  await loadProduct(productId);
  await loadCharacteristics(productId);
  productIsLoaded.value = true;
}

setProduct();

// Делаю хлебные крошки
const getBreadcrumbsProduct = computed(() => {
  const tnName = catalogStore.productCatalog.find(
    (el) => el.id === product.value.tn_id
  );
  const tkName = catalogStore.productCatalog.find(
    (el) => el.id === product.value.tk_id
  );
  return [
    { name: "Каталог", url: "/catalog" },
    { name: `${tnName.name}`, url: `/catalog/${product.value.tn_id}` }, // направление
    { name: `${tkName.name}`, url: `/catalog/${product.value.tk_id}` }, // категория
    {},
  ];
});

// Получаю 6 характеристик
const getTopCharacteristics = computed(() => {
  return characteristics.value.filter((el, index) => index <= 6);
});

// Открыть модальное окно с авторизацией
function handleSignIn() {
  authStore.openAuthModal();
}

async function handleToCart() {
  // Если товар не добавлен в корзину
  if (!isAddedCart.value) {
    isBtnSpinner.value = true;

    const res = await cartStore.addToCart(
      product.value.code,
      selectedValue.value || product.value.salekrat
    );

    if (res instanceof Error || res == undefined) {
      console.log("Error: ", res);
    } else {
      isBtnSpinner.value = false;
      isAddedCart.value = true;
      product.value.qty_incart = selectedValue.value;
      await cartStore.getShortCart();
    }
  }
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          // console.log('123', entry.target.getAttribute('id'))
          currentSection.value = entry.target.getAttribute("id");
        }
      });
    },
    { rootMargin: "0px 0px -80% 0px" }
  );

  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
});

function handleAllCharacteristics() {
  const el = document.querySelector("#characteristics");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }

  currentSection.value = "characteristics";
}

function tabHandler(tab) {
  if (tab.enable) {
    currentSection.value = tab.alias;
    document
      .querySelector(`#${tab.alias}`)
      .scrollIntoView({ behavior: "smooth" });
  }
  return;
}

async function addFavoritiesHandler() {
  await profileStore.addToFavorities(productId);
  product.value.isfavority = true;
}

async function removeFavoritiesHandler() {
  await profileStore.removeFromFavorities(productId);
  product.value.isfavority = false;
}
</script>
