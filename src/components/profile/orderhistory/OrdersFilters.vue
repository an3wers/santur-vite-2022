<template>
  <div class="space-y-4">
    <div class="flex space-x-4 justify-between">
      <!-- 
            Поиск
            Фильтр по атвору, статусу, времени создания
         -->
      <div class="flex space-x-4 grow flex-none max-w-[800px]">
        <app-selector-slots
          inputSize="md"
          inputType="border"
          :value="selectedStatus"
          @change="$emit('onChangeStatus', $event.target.value)"
        >
          <option
            v-for="status in statusOptions"
            :key="status.code"
            :value="status.code"
          >
            {{ status.title }}
          </option>
        </app-selector-slots>

        <app-selector-slots
          inputSize="md"
          inputType="border"
          :value="selectedTimeRange"
          @change="$emit('onChangeTimeRange', $event.target.value)"
        >
          <option
            v-for="time in timeRangeOptions"
            :key="time.value"
            :value="time.value"
          >
            {{ time.text }}
          </option>
        </app-selector-slots>

        <app-selector-slots
          inputSize="md"
          inputType="border"
          v-model="selectedAuthor"
        >
          <option
            v-for="author in authorOptions"
            :key="author.value"
            :value="author.value"
          >
            {{ author.text }}
          </option>
        </app-selector-slots>
      </div>
      <app-button
        @click="$emit('onCleanAllFilters')"
        btnSize="md"
        btnType="light"
        >Очистить фильтры</app-button
      >
    </div>

    <!-- Поиск -->
    <div class="flex justify-between space-x-4">
      <div class="grow relative">
        <input
          type="text"
          class="w-full rounded-md border form-input disabled:text-gray-500 py-2 text-base px-3 leading-5 bg-transparent border-gray-300 focus:border-primary focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100"
          placeholder="Найти по номеру или товару"
          :value="orderSearchValue"
          @input="$emit('onInput', $event.target.value)"
        />
        <button
          v-if="!isRemoveSearchValue"
          class="absolute right-[12px] top-[9px]"
        >
          <search-icon-20 color="#1976D2" />
        </button>
        <button
          @click="$emit('onRemoveSearchValue')"
          v-else
          class="absolute right-[12px] top-[9px]"
        >
          <close-icon-20 color="#6b7280" />
        </button>
      </div>
      <div class="flex space-x-4">
        <app-button
          @click="onOpenModalWithProducts"
          btnType="secondary"
          btnSize="md"
          >Товары готовые к отгрузке</app-button
        >
        <app-button btnType="secondary" btnSize="md"
          >Объединить заказы</app-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import AppSelectorSlots from "@/components/UI/Forms/AppSelectorSlots.vue";
import AppButton from "@/components/UI/Buttons/AppButton.vue";
import SearchIcon20 from "@/components/UI/Icons/SearchIcon_20.vue";
import { ref, computed } from "vue";
import CloseIcon20 from "@/components/UI/Icons/CloseIcon_20.vue";

const props = defineProps({
  orderSearchValue: {
    type: String,
    default: "",
  },
  timeRangeOptions: {
    type: Array,
  },
  selectedTimeRange: {
    type: String,
  },
  selectedStatus: {
    type: String,
  },
  statusOptions: {
    type: Array,
  },
});

const emits = defineEmits([
  "onInput",
  "onRemoveSearchValue",
  "onChangeTimeRange",
  "onChangeStatus",
  "onCleanAllFilters",
  "openModalWithProducts",
]);

const isRemoveSearchValue = computed(() => {
  return !!props.orderSearchValue;
});

const selectedAuthor = ref("");

// tests
const authorOptions = [
  { text: "Корчагин Михаил Егорович", value: "Корчагин Михаил Егорович" },
  { text: "Яшина Софья Никитична", value: "Яшина Софья Никитична" },
];

function onOpenModalWithProducts() {
  emits("openModalWithProducts");
}
</script>
