<template>
  <div class="container">
    <!-- Оформлен, сохранен -->
    <div v-if="$route.query.order">
      <h1>Заказ оформлен</h1>
      <p>Ваш заказ: №{{ $route.query.order }}</p>
      <p>
        В течение 10 минут заказ будет обработан и на ваш email придет
        подтверждение.
      </p>
    </div>

    <div v-if="$route.query.draft">
      <h1>Заказ сохранен</h1>
      <p>Ваш заказ: № {{ $route.query.draft }}</p>
      <p>Заказ сохранен, как черновик и доступен в профиле, в истории заказов.</p>
    </div>

    <div class="flex space-x-4 mt-6">
      <RouterLink
        to="/"
        class="py-2 text-base px-3 leading-5 inline-flex items-center text-center justify-center rounded-md disabled:opacity-75 no-underline bg-primary border border-transparent hover:bg-primary-hover hover:text-white focus:outline-none focus:ring-blue-500 focus:ring focus:ring-opacity-20 text-white"
        >На главную</RouterLink
      >
      <RouterLink
        :to="`/profile/orderhistory/${getOrderNumber}`"
        class="py-2 text-base px-3 leading-5 inline-flex items-center text-center justify-center rounded-md disabled:opacity-75 no-underline bg-slate-200 border border-transparent hover:bg-slate-300 hover:text-gray-600 focus:outline-none focus:ring-slate-500 focus:ring focus:ring-opacity-20 text-gray-600"
        >Перейти в заказ</RouterLink
      >
    </div>
  </div>
</template>

<script setup>
// import AppButton from '@/components/UI/Buttons/AppButton.vue'
import { useCartStore } from "@/stores/cart";
import { useRouter, useRoute } from "vue-router";
import { computed } from 'vue'
// const router = useRouter();
const route = useRoute();

const getOrderNumber = computed(() => {
  return route.query.order || route.query.draft
}) 

const { getShortCart } = useCartStore();
getShortCart();

</script>
