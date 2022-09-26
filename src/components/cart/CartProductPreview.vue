<template>
  <div class="flex items-start space-x-4 py-4 first:pt-0 last:pb-0">
    <div class="shrink-0 w-24 h-24">
      <!-- Изображение -->
      <img
        :src="product.imgpath"
        class="w-full h-full object-contain"
        :alt="product.name"
      />
    </div>
    <div class="grow flex flex-col space-y-2">
      <!-- Название и т.д -->
      <div class="text-xs text-secondary-text">
        <!-- code -->
        {{ product.code }}
      </div>
      <RouterLink
        class="no-underline text-gray-900 grow"
        :to="`/product/${product.code}`"
      >
        <!-- name -->
        {{ product.name }}
      </RouterLink>

      <div class="flex">
        <!-- remove or favorite -->
        <app-button
          @click="removeHandler(product.code)"
          class="-ml-2"
          btnType="light"
          btnSize="xs"
        >
          <delete-icon-20 color="#4b5563" />
          Удалить
        </app-button>
        <app-button
          @click="addFavorityHandler(product.code)"
          v-if="!product.isfafority"
          btnType="light"
          btnSize="xs"
        >
          <bookmark-icon-20 color="#4b5563" />
          Избранное
        </app-button>
        <button
          v-else
          @click="removeFavorityHandler(product.code)"
          class="py-1 text-sm px-2 inline-flex items-center text-center justify-center rounded-md disabled:opacity-75 bg-transparent border border-transparent hover:bg-slate-100 focus:outline-none focus:ring-slate-500 focus:ring focus:ring-opacity-20"
        >
          <bookmark-icon-fill-20 color="#1976D2" />
          В избранном
        </button>
      </div>
    </div>
    <div class="shrink-0 w-52 flex flex-col text-right">
      <!-- Цена и т.д. -->
      <div>
        <span class="font-semibold text-lg">{{ product.summs }} ₽</span>
      </div>
      <div>
        <span class="text-sm text-gray-500"
          >{{ product.prices }} ₽ за {{ product.ed }}.</span
        >
      </div>

      <div class="relative flex items-center w-40 my-3 ml-auto">
        <app-button-icon
          :disabled="!isRemoveBtn"
          btnType="light"
          btnSize="xs"
          aria-label="Уменьшить"
          class="absolute left-2"
          @click="changeValueHandler('remove', product.code)"
        >
          <remove-icon-20 />
        </app-button-icon>
        <!-- @input="($event) => count = $event.target.value" -->
        <input
          type="number"
          v-model="count"
          :placeholder="product.salekrat"
          :step="product.salekrat"
          :min="product.salekrat"
          :max="MAXPRODUCT_COUNT"
          @blur="setNewValue"
          @keypress.enter="$event.target.blur()"
          class="w-full rounded-md border form-input bg-transparent border-gray-300 focus:border-primary focus:ring focus:ring-blue-200 focus:ring-opacity-50 py-2 text-center text-base px-6 leading-5"
        />
        <app-button-icon
          :disabled="!isAddBtn"
          btnType="light"
          btnSize="xs"
          aria-label="Добавить"
          class="absolute right-2"
          @click="changeValueHandler('add', product.code)"
        >
          <plus-icon-20 />
        </app-button-icon>
      </div>
      <div>
        <!-- stock -->

        <div
          class="inline-flex space-x-1"
          v-if="product.incash_info === 'В наличии'"
        >
          <check-circle-20 color="#16a34a" />
          <span class="text-sm text-secondary-text"
            >{{ product.incash_info }}: {{ product.incash }}
            {{ product.ed }}.</span
          >
        </div>
        <div
          class="inline-flex space-x-1"
          v-else-if="product.incash_info === 'Под заказ'"
        >
          <schedule-icon-20 color="#9ca3af" />
          <span class="text-sm text-secondary-text">{{
            product.incash_info
          }}</span>
        </div>

        <div class="inline-flex space-x-1" v-else>
          <shipping-icon-20 color="#9ca3af" />
          <span class="text-sm text-secondary-text">{{
            product.incash_info
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppButton from "@/components/UI/Buttons/AppButton.vue";
import AppButtonIcon from "@/components/UI/Buttons/AppButtonIcon.vue";
import PlusIcon20 from "@/components/UI/Icons/PlusIcon_20.vue";
import RemoveIcon20 from "@/components/UI/Icons/RemoveIcon_20.vue";
import DeleteIcon20 from "@/components/UI/Icons/DeleteIcon_20.vue";
import CheckCircle20 from "@/components/UI/Icons/CheckCircle_20.vue";
import ScheduleIcon20 from "@/components/UI/Icons/ScheduleIcon_20.vue";
import ShippingIcon20 from "@/components/UI/Icons/ShippingIcon_20.vue";
import BookmarkIcon20 from "@/components/UI/Icons/BookmarkIcon_20.vue";
import BookmarkIconFill20 from "@/components/UI/Icons/BookmarkIconFill_20.vue";
import { setCountProduct, useToFixedNumber } from "@/utils/helpers";

import { ref, computed } from "vue";
import { useProfileStore } from "@/stores/profile";
import { useCartStore } from "@/stores/cart";
import { useAppMessage } from "@/stores/appMessage";

const cartStore = useCartStore();
const appMessageStore = useAppMessage();
const profileStore = useProfileStore();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const count = ref(props.product.qty);

// const getCount = computed({
//   get() {
//     return count.value
//   },
//   set(newVal){
//     count.value = newVal
//   }
// })

const MAXPRODUCT_COUNT = 10000;

const timer = ref(true);

async function setNewValue() {
  count.value = setCountProduct(
    count.value,
    MAXPRODUCT_COUNT,
    props.product.salekrat
  );

  if (props.product.qty != count.value) {
    if (count.value > 0) {
      cartStore.cartIsUpdated = false;
      const res = await cartStore.changeCount(props.product.code, count.value);
      if (res instanceof Error || res == undefined) {
        console.log("Error", res);
      } else {
        await cartStore.getCart();
        cartStore.cartIsUpdated = true;
      }
    } else if (count.value == 0) {
      await removeHandler(props.product.code);
    }
  }
}

// async function setNewValue() {
//   props.product.qty = setCountProduct(
//     props.product.qty,
//     MAXPRODUCT_COUNT,
//     props.product.salekrat
//   );

//   if (props.product.qty != count.value) {
//     count.value = props.product.qty;
//     if (count.value > 0) {
//       cartStore.cartIsUpdated = false;
//       const res = await cartStore.changeCount(props.product.code, count.value);
//       if (res instanceof Error || res == undefined) {
//         // TODO: Обработать ошибку
//         console.log("Error", res);
//       } else {
//         await cartStore.getCart();
//         cartStore.cartIsUpdated = true;
//       }
//     } else if (count.value == 0) {
//       await removeHandler(props.product.code);
//     }
//   }
// }

const isRemoveBtn = computed(() => {
  return count.value > 0;
});

const isAddBtn = computed(() => {
  return count.value < MAXPRODUCT_COUNT;
});

// async function changeValueHandler(param, product) {
//   if (param === "add") {
//     props.product.qty =
//       useToFixedNumber(props.product.qty) + props.product.salekrat;
//     props.product.qty = useToFixedNumber(props.product.qty);
//   } else if (param === "remove") {
//     props.product.qty =
//       useToFixedNumber(props.product.qty) - props.product.salekrat;
//     props.product.qty = useToFixedNumber(props.product.qty);
//   }

//   count.value = props.product.qty;

//   if (timer.value) {
//     clearTimeout(timer.value);
//     timer.value = null;
//   }

//   timer.value = setTimeout(async () => {
//     if (props.product.qty > 0) {
//       cartStore.cartIsUpdated = false;

//       const res = await cartStore.changeCount(product, props.product.qty);

//       if (res instanceof Error || res == undefined) {
//         console.log("Error", res);
//       } else {
//         await cartStore.getCart();
//       }

//       cartStore.cartIsUpdated = true;
//     } else if (props.product.qty == 0) {
//       await removeHandler(props.product.code);
//     }
//   }, 800);
// }

async function changeValueHandler(param, product) {
  if (param === "add") {
    count.value = useToFixedNumber(count.value) + props.product.salekrat;
    count.value = useToFixedNumber(count.value);
  } else if (param === "remove") {
    count.value = useToFixedNumber(count.value) - props.product.salekrat;
    count.value = useToFixedNumber(count.value);
  }

  if (timer.value) {
    clearTimeout(timer.value);
    timer.value = null;
  }

  timer.value = setTimeout(async () => {
    if (count.value > 0) {
      cartStore.cartIsUpdated = false;

      const res = await cartStore.changeCount(product, count.value);

      if (res instanceof Error || res == undefined) {
        console.log("Error", res);
      } else {
        await cartStore.getCart();
      }

      cartStore.cartIsUpdated = true;
    } else if (count.value == 0) {
      await removeHandler(props.product.code);
    }
  }, 800);
}

async function removeHandler(product) {
  cartStore.cartIsUpdated = false;
  const res = await cartStore.removeFromCart(product);

  if (res instanceof Error || res == undefined) {
    console.log("Error", res);
  } else {
    await cartStore.getCart();

    cartStore.cartIsUpdated = true;
    appMessageStore.openWithTimer(
      "info",
      `Товар ${props.product.name} — удален`,
      "info"
    );
  }
}

async function addFavorityHandler(product) {
  await profileStore.addToFavorities(product);
  const current = cartStore.cartItems.find((el) => el.code === product);
  current.isfafority = true;
}
async function removeFavorityHandler(product) {
  await profileStore.removeFromFavorities(product);
  const current = cartStore.cartItems.find((el) => el.code === product);
  current.isfafority = false;
}
</script>
