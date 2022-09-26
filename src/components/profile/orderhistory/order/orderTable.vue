<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div class="font-bold text-2xl">Товары</div>
      <div class="relative w-64">
        <input
          type="text"
          class="w-full rounded-md border form-input disabled:text-gray-500 py-2 text-base px-3 leading-5 bg-transparent border-gray-300 focus:border-primary focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100"
          placeholder="Найти товар"
          v-model="searchValue"
        />
        <button v-if="!searchValue" class="absolute right-[12px] top-[8px]">
          <search-icon-20 color="#1976D2" />
        </button>
        <button
          @click="searchValue = ''"
          v-else
          class="absolute right-[12px] top-[8px]"
        >
          <close-icon-20 color="#6b7280" />
        </button>
      </div>
    </div>
    <div v-if="filteredItems.length" class="block relative overflow-x-auto">
      <!-- goods -->
      <table class="w-full text-sm text-left">
        <thead
          class="text-xs tracking-tight text-gray-900 uppercase bg-slate-100"
        >
          <tr>
            <th scope="col" class="py-3 px-3 w-16 min-w-[64px]"></th>
            <th scope="col" class="py-3 px-3 min-w-[250px]">Наименование</th>
            <th
              scope="col"
              class="py-3 px-3 min-w-[112px] w-28 whitespace-nowrap"
            >
              Цена, ₽
            </th>
            <th
              scope="col"
              class="py-3 px-3 min-w-[112px] w-28 whitespace-nowrap"
            >
              Количество
            </th>
            <th
              scope="col"
              class="py-3 px-3 min-w-[128px] w-32 whitespace-nowrap"
            >
              Стоимость, ₽
            </th>
            <th
              scope="col"
              class="py-3 px-3 min-w-[112px] w-28 whitespace-nowrap"
            >
              Резерв
            </th>
            <th
              scope="col"
              class="py-3 px-3 min-w-[112px] w-28 whitespace-nowrap"
            >
              Отгружено
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in filteredItems"
            :key="item.code"
            class="bg-white border-b border-gray-300 hover:bg-slate-100"
          >
            <td scope="col" class="py-3 px-1 w-16 min-w-[64px]">
              <div class="w-14 h-14">
                <img
                  class="w-full h-full object-contain"
                  :src="item.imgpath"
                  :alt="item.name"
                />
              </div>
            </td>
            <td scope="col" class="py-3 px-3 min-w-[250px]">
              <div class="text-xs text-gray-500">{{ item.code }}</div>
              <div>
                <!-- <NuxtLink :to="`/product/${item.code}`" class=" no-underline text-gray-900"> -->
                <RouterLink
                  :to="{
                    path: `/product/${item.code}`,
                    query: { fromOder: '' },
                  }"
                  class="no-underline text-gray-900"
                >
                  {{ item.name }}
                </RouterLink>
              </div>
              <!-- статусы -->
              <div class="mt-2">
                <span
                  class="py-1 px-2 bg-gray-200 rounded-lg"
                  v-if="item.incash === 'нет на складе'"
                  >{{ item.incash }}</span
                >
                <span
                  class="py-1 px-2 bg-green-200 rounded-lg inline-flex"
                  v-else
                >
                  <check-circle-20 color="#16a34a" class="mr-1" />
                  {{ item.incash }}
                </span>
              </div>
            </td>
            <td
              scope="col"
              class="py-3 px-3 min-w-[112px] w-28 whitespace-nowrap"
            >
              <Popper arrow hover content="Цена, ₽">
                {{ item.price_s }}
              </Popper>
            </td>
            <td
              scope="col"
              class="py-3 px-3 min-w-[112px] w-28 whitespace-nowrap"
            >
              <Popper arrow hover content="Количество">
                {{ item.qty }} {{ item.ed }}.
              </Popper>
            </td>
            <td
              scope="col"
              class="py-3 px-3 min-w-[128px] w-32 whitespace-nowrap"
            >
              <Popper arrow hover content="Стоимость, ₽">
                {{ item.summ_s }}
              </Popper>
            </td>
            <td
              scope="col"
              class="py-3 px-3 min-w-[112px] w-28 whitespace-nowrap"
            >
              <Popper arrow hover content="Резерв">
                {{ item.booking }} {{ item.ed }}.
              </Popper>
            </td>
            <td
              scope="col"
              class="py-3 px-3 min-w-[112px] w-28 whitespace-nowrap"
            >
              <Popper arrow hover content="Отгружено">
                {{ item.realized }} {{ item.ed }}.
              </Popper>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="py-5">
      <p class="text-center">Товары не найдены</p>
    </div>
  </div>
</template>

<script setup>
import SearchIcon20 from "@/components/UI/Icons/SearchIcon_20.vue";
import CloseIcon20 from "@/components/UI/Icons/CloseIcon_20.vue";
import { ref, computed } from "vue";
import Popper from "vue3-popper";
import CheckCircle20 from "@/components/UI/Icons/CheckCircle_20.vue";

const { items } = defineProps({
  items: {
    type: Array,
    default: [],
  },
});

const searchValue = ref("");

const filteredItems = computed(() => {
  return items.filter(
    (el) =>
      el.name.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      el.code.toLowerCase().includes(searchValue.value.toLowerCase())
  );
});
</script>
