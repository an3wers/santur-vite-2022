<template>
  <div
    class="flex flex-col divide-y divide-slate-300 space-y-4 px-4 py-6 bg-slate-100 rounded-lg category-filter"
  >
    <div class="flex justify-between items-baseline">
      <div class="text-2xl font-bold">Фильтры</div>
      <app-button
        @click="handleAll"
        :disabled="!getIsCleanValidate"
        btnType="link"
        btnSize="xs"
        >Очистить</app-button
      >
    </div>
    <!-- Фильтр по цене -->
    <div class="category-filter__item space-y-3 pt-4">
      <div class="font-bold">Цена</div>
      <div class="flex space-x-2">
        <!-- Переделать на стандартные инпуты -->

        <div class="relative">
          <!-- @input="onChangeMinLimitPrice($event.target.value)" -->
          <input
            v-model="minPriceVal"
            :placeholder="`от ${getFilterPrice.MinLimit}`"
            @blur="onChangeMinLimitPrice($event.target.value)"
            @keypress.enter="$event.target.blur()"
            type="number"
            class="w-full rounded-md border form-input bg-white border-transparent focus:border-primary focus:ring focus:ring-blue-200 focus:ring-opacity-50 py-1.5 text-sm px-2.5"
          />
          <!-- <close-icon-20
            @click="resetLimit('min')"
            v-if="minPriceVal"
            color="#6b7280"
            class="absolute right-1 top-2 cursor-pointer"
          /> -->
        </div>

        <div class="relative">
          <!-- @input="onChangeMaxLimitPrice($event.target.value)" -->
          <input
            v-model="maxPriceVal"
            :placeholder="`до ${getFilterPrice.MaxLimit}`"
            @blur="onChangeMaxLimitPrice($event.target.value)"
            @keypress.enter="$event.target.blur()"
            type="number"
            class="w-full rounded-md border form-input bg-white border-transparent focus:border-primary focus:ring focus:ring-blue-200 focus:ring-opacity-50 py-1.5 text-sm px-2.5"
          />
          <!-- <close-icon-20
            @click="resetLimit('max')"
            v-if="maxPriceVal"
            color="#6b7280"
            class="absolute right-1 top-2 cursor-pointer"
          /> -->
        </div>
      </div>
    </div>
    <!-- # Фильтр по цене -->
    <!-- Фильтры чекбоксы -->
    <catalog-filter-item
      @setFilter="handleFilter"
      v-for="filter in getFiltersCheckbox"
      :key="filter.Name"
      :filter="filter"
    />

    <!-- Кнопка "Найдено товаров" -->
    <Transition name="fade">
      <div
        v-if="catalogStore.displaySelectedFilterBtn"
        @click="catalogStore.handleDisplaySelectedFilterBtn"
        class="fixed bottom-8 cursor-pointer py-2.5 px-4 bg-gray-700 border border-transparent rounded-md shadow-md text-center w-72 xl:w-64 filter-float-btn z-10 text-white font-semibold"
      >
        Товаров найдено: {{ categoryStore.productCount }} шт.
      </div>
    </Transition>
  </div>
</template>

<script setup>
import AppButton from "@/components/UI/Buttons/AppButton.vue";
import AppCheckbox from "@/components/UI/Forms/AppCheckbox.vue";
import AppInput from "@/components/UI/Forms/AppInput.vue";
import CatalogFilterItem from "@/components/catalog/CatalogFilterItem.vue";
import CloseIcon20 from "@/components/UI/Icons/CloseIcon_20.vue";

import { computed, ref } from "vue";
import { useCatalogStore } from "@/stores/catalog";
import { useCategoryStore } from "@/stores/category";

const catalogStore = useCatalogStore();
const categoryStore = useCategoryStore();

const props = defineProps({
  filters: {
    type: Array,
    defaults: [],
  },
});

// const isResetMin = ref(false)
// const isResetMax = ref(false)

function clickFloatBtn() {
  emit("clickFloatBtn");
}

const emit = defineEmits([
  "handleFilter",
  "cleanAll",
  "clickFloatBtn",
  "changeMaxLimitPrice",
  "changeMinLimitPrice",
  "resetPrice",
]);

const getFiltersCheckbox = computed(() => {
  return props.filters.filter((el) => el.IsNumeric === false);
});

const getFilterPrice = computed(() => {
  return props.filters.filter(
    (el) => el.IsNumeric === true && el.Name === "Цена"
  )[0];
});

// TODO Сделать маску для ввода
const maxPriceVal = ref(getFilterPrice.value.MaxSelect);
const minPriceVal = ref(getFilterPrice.value.MinSelect);

const getIsCleanValidate = computed(() => {
  return (
    categoryStore.setedFilters.length || categoryStore.setedFiltersPrice.length
  );
});

function onChangeMinLimitPrice(value) {
  // array minprice ["maxprice:500", "minprice:500"]

  let settedMinValue = 0;
  categoryStore.setedFiltersPrice.forEach((el) => {
    el.split(":").forEach((p, i, arr) => {
      if (arr[0] === "minprice") {
        settedMinValue = arr[1];
      }
    });
  });

  if (minPriceVal.value && minPriceVal.value !== settedMinValue) {
    emit("changeMinLimitPrice", value, getFilterPrice.value.Name);
  }
}

function onChangeMaxLimitPrice(value) {
  let settedMaxValue = 0;
  categoryStore.setedFiltersPrice.forEach((el) => {
    el.split(":").forEach((p, i, arr) => {
      if (arr[0] === "maxprice") {
        settedMaxValue = arr[1];
      }
    });
  });

  if (maxPriceVal.value && maxPriceVal.value !== settedMaxValue) {
    emit("changeMaxLimitPrice", value, getFilterPrice.value.Name);
  }
}

// TODO: разобраться почему отрабатывает два раза
categoryStore.$subscribe((setedFiltersPrice) => {
  if (categoryStore.setedFiltersPrice.length !== 0) {
    const arr = [];
    categoryStore.setedFiltersPrice.forEach((el) => {
      const priceArr = el.split(":");
      arr.push(priceArr[0]);
    });

    if (!arr.includes("maxprice")) {
      maxPriceVal.value = "";
    }
    if (!arr.includes("minprice")) {
      minPriceVal.value = "";
    }
  } else {
    maxPriceVal.value = "";
    minPriceVal.value = "";
  }
});

// Сброс цен на начальные значения
function resetLimit(type) {
  let settedMaxValue = 0;
  let settedMinValue = 0;

  if (type === "min") {
    categoryStore.setedFiltersPrice.forEach((el) => {
      el.split(":").forEach((p, i, arr) => {
        if (arr[0] === "maxprice") {
          settedMinValue = arr[1];
        }
      });
    });
    minPriceVal.value = "";
    if (settedMinValue) {
      emit("resetPrice", getFilterPrice.value.Name, type);
    }
  }
  if (type === "max") {
    categoryStore.setedFiltersPrice.forEach((el) => {
      el.split(":").forEach((p, i, arr) => {
        if (arr[0] === "maxprice") {
          settedMaxValue = arr[1];
        }
      });
    });
    maxPriceVal.value = "";
    if (settedMaxValue) {
      emit("resetPrice", getFilterPrice.value.Name, type);
    }
  }
}

function handleFilter(name, event) {
  //
  emit("handleFilter", {
    name,
    value: event.target.value,
    isChecked: event.target.checked,
  });
}

function handleAll() {
  maxPriceVal.value = "";
  minPriceVal.value = "";
  emit("cleanAll");
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
