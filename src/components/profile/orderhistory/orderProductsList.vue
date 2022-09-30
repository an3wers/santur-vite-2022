<template>
  <div>
    <div v-if="!isModalProductsLoaded">
      <!-- Загрузка... -->
      <AppLoader />
    </div>
    <div v-else-if="data.length && isModalProductsLoaded">
      <table class="w-full text-sm text-left">
        <thead class="text-xs tracking-tight text-gray-900 uppercase bg-white">
          <tr class="border-b border-gray-300">
            <th scope="col" class="py-3 px-3 min-w-[250px]">Наименование</th>
            <th scope="col" class="py-3 px-3 min-w-[112px] w-28">Количество</th>
            <th scope="col" class="py-3 px-3 min-w-[112px] w-28">Резерв</th>
            <th scope="col" class="py-3 px-3 min-w-[112px] w-28">Отгружено</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="order in data" :key="order.id">
            <tr class="border-b border-gray-300 bg-slate-100">
              <td scope="col" colspan="4" class="py-3 px-3">
                <div class="flex justify-between">
                  <span class="font-bold"
                    >Заказ {{ order.id }}/
                    <span v-if="order.code">{{ order.code }}</span> от
                    {{ order.regdates }}</span
                  >
                  <RouterLink :to="`/profile/orderhistory/${order.id}`"
                    >Открыть</RouterLink
                  >
                </div>
              </td>
            </tr>

            <tr
              v-for="product in order.products"
              :key="product.goodcode"
              class="bg-white border-b border-gray-300 hover:bg-slate-100"
            >
              <td scope="col" class="py-3 px-3 min-w-[250px]">
                <div class="text-gray-500">{{ product.goodcode }}</div>
                <div>{{ product.name }}</div>
              </td>
              <td scope="col" class="py-3 px-3 min-w-[112px] w-28">
                <Popper arrow hover content="Количество">
                  {{ product.qty }}
                </Popper>
              </td>
              <td scope="col" class="py-3 px-3 min-w-[112px] w-28">
                <Popper arrow hover content="Резерв">
                  {{ product.qtybooking }}
                </Popper>
              </td>
              <td scope="col" class="py-3 px-3 min-w-[112px] w-28">
                <Popper arrow hover content="Отгружено">
                  {{ product.qtyrealyze }}
                </Popper>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div v-else-if="!data.length && isModalProductsLoaded">
      <p>Товаров готовых к отгрузке нет.</p>
    </div>
  </div>
</template>

<script setup>
import AppLoader from "@/components/loaders/AppLoader.vue";
import Popper from "vue3-popper";

const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
  isModalProductsLoaded: {
    type: Boolean,
    default: false,
  },
});
</script>
