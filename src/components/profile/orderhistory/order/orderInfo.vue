<template>
  <div class="p-6 rounded-xl bg-slate-100">
    <h2>Информация о заказе</h2>
    <ul class="list-none divide-y divide-slate-300">
      <li class="flex justify-between py-3 items-start">
        <span>Товары</span>
        <span class="font-semibold">{{ costGoodiesS }} ₽</span>
      </li>
      <li v-if="discount" class="flex justify-between py-3 items-start">
        <span>Скидка</span>
        <span class="font-semibold">{{discountS}}%</span>
      </li>
      <li class="flex justify-between py-3 items-start">
        <span>Количество товаров</span>
        <span class="font-semibold">{{ qtyGoodies }} шт.</span>
      </li>
      <li class="flex justify-between py-3 items-start">
        <span>Вес заказа</span>
        <span class="font-semibold">{{ weightSummary }} кг</span>
      </li>
      <li class="flex justify-between py-3 items-start">
        <span>Вес товаров в наличии</span>
        <span class="font-semibold">{{ weightAvailable }} кг</span>
      </li>
      <li class="flex justify-between py-3 font-bold text-xl items-start">
        <span>Итого</span>
        <span>{{summaryS}} ₽</span>
      </li>
    </ul>
    <!-- Способ получения -->
    <div class="mt-5 space-y-3">
      <div class="font-bold text-xl text-gray-500">Способ получения</div>
      <div>
        <div class="font-semibold">{{receivingMethod}}</div>
        <div>{{receivingAddress}}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  costGoodiesS: {
    type: String,
    default: ''
  },
  discount: {
    type: Number,
    default: 0
  },
  discountS: {
    type: String,
    default: ''
  },
  qtyGoodies: {
    type: Number,
    default: 0
  },
  summaryS: {
    type: String,
    default: ''
  },
  costDeliveryS: {
    type: String,
    default: ''
  },
  weightSummary: {
    type: Number,
    default: 0
  },
  weightAvailable: {
    type: Number,
    default: 0
  },
  receivingAddress: {
    type: String,
    default: ''
  },
  receivingMethod: {
    type: String,
    default: ''
  }
})
</script>
