<template>
  <div class="checkout-page">
    <div class="container">
      <!-- back stap -->
      <app-go-back />
      <checkout-empty-state
        v-if="cartStore.cartItems.length === 0 || !authStore.getIsAuth"
      />
      <div v-else class="grid grid-cols-12 gap-6">
        <div class="col-start-1 col-end-9 space-y-6">
          <h1 v-if="!cartStore.cartId">Оформление заказа</h1>
          <h1 v-else>Сохранение заказа</h1>

          <checkout-person-info
            v-model:getMethod="getMethod"
            v-model:deliveryAddress="deliveryAddress"
            v-model:comment="orderComment"
          />
        </div>
        <div class="col-start-9 col-end-13 space-y-6">
          <checkout-info
            :isConfirm="getOrderIsConfirm"
            :btnProcessing="btnProcessing"
            @onClick="orderSubmitHandler"
          />
        </div>
      </div>
      <!-- Пустое состояние ? -->
    </div>
    <page-loader v-if="!checkoutIsLoaded" />
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";
import CheckoutInfo from "@/components/checkout/CheckoutInfo.vue";
import PageLoader from "@/components/loaders/PageLoader.vue";
import AppGoBack from "@/components/AppGoBack.vue";
import CheckoutPersonInfo from "@/components/checkout/CheckoutPersonInfo.vue";
import CheckoutEmptyState from "@/components/checkout/CheckoutEmptyState.vue";
import { useAppMessage } from "@/stores/appMessage";

const cartStore = useCartStore();
const authStore = useAuthStore();
const checkoutIsLoaded = ref(false);
const appMessageStore = useAppMessage();
const router = useRouter();

const btnProcessing = ref(false)

const getMethod = ref("self");
const deliveryAddress = ref("");
const orderComment = ref("");
const payMethod = ref("бн");

const orderIsConfirm = ref(true);

async function loadCart() {
  const res = await cartStore.getCart();
  if (res instanceof Error) {
    // TODO: Обработать ошибку
    console.log("Error", res);
  }
  checkoutIsLoaded.value = true;
}

if (cartStore.cartId === null) {
  loadCart();
} else {
  checkoutIsLoaded.value = true;
}

const getOrderIsConfirm = computed(() => {
  if (getMethod.value === "self") {
    return orderIsConfirm.value;
  } else {
    if (deliveryAddress.value) {
      return orderIsConfirm.value;
    }
    return !orderIsConfirm.value;
  }
});

async function orderSubmitHandler() {
  btnProcessing.value = true
  const res = await cartStore.cartConfirm(
    payMethod.value,
    orderComment.value,
    deliveryAddress.value,
    "ord"
  );

  if (res instanceof Error) {
    if (cartStore.cartId) {
      appMessageStore.open(
        "error",
        "При сохранении заказа произошла ошибка",
        "error"
      );
    } else {
      appMessageStore.open(
        "error",
        "При оформлении заказа произошла ошибка",
        "error"
      );
    }
  } else {
    console.log(res)
    if (cartStore.cartId) {
      await cartStore.getCart()
      btnProcessing.value = false
      router.push({ path: `/profile/orderhistory/${res}` });
    } else {
      btnProcessing.value = false
      router.push({ path: "/thank", query: { order: res } });
    }
  }

  // console.log(
  //   'ЗАКАЗ:',
  //   getMethod.value,
  //   deliveryAddress.value,
  //   orderComment.value,
  //   payMethod.value
  // )
}
</script>
