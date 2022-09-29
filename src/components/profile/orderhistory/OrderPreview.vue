<template>
  <div class="py-4 px-1 flex space-x-6 items-start hover:bg-slate-100">
    <div v-if="isOrderMergeMode">
      <!-- <app-checkbox
        @change="handleSelectedForMerge(order.ID)"
        :isLabel="false"
        type="border"
        v-model="selectedForMerge"
        class="mt-1.5"
      /> -->

      <input
          type="checkbox"
          :value="order.ID"
          :checked="getSelectedOrder"
          @change="handleSelectedForMerge($event.target.checked, order.ID)"
          class="-mb-1 rounded border-gray-400 text-primary focus:border-blue-500 focus:ring focus:ring-offset-0 focus:ring-blue-500 focus:ring-opacity-20 bg-transparent"
        />

    </div>
    <div class="grow">
      <div>
        <RouterLink
          :to="`/profile/orderhistory/${order.ID}`"
          class="no-underline text-gray-900 font-medium hover:text-primary"
          >Заказ {{ order.ID
          }}<span v-if="order.Code">/ {{ order.Code }}</span></RouterLink
        >
      </div>
      <div class="text-sm text-gray-500">
        {{ order.RegDate }} <span class="ml-1">{{ order.RegTime }}</span>
      </div>
      <div class="flex flex-wrap mt-2">
        <!-- Превью товаров -->
        <div
          v-for="prod in getOrderItems"
          :key="prod.GoodCode"
          class="w-10 h-10 border border-gray-200 mr-1 mt-1 last:mr-0"
        >
          <img
            :src="prod.img"
            class="object-contain w-full h-full"
            alt="prod.GoodCode"
          />
        </div>
        <div
          v-if="order.QtyItems > 12"
          class="w-10 h-10 border border-gray-200 bg-gray-100 mr-1 mt-1 last:mr-0 flex items-center justify-center"
        >
          <span class="text-gray-400 text-sm font-medium"
            >+{{ order.QtyItems - MAX_ORDER_ITEMS }}</span
          >
        </div>
      </div>
    </div>
    <div class="w-48 shrink-0">
      <div class="inline-flex items-center space-x-2">
        <Popper hover arrow :content="order.StateDescr">
          <info-icon-20 color="#9ca3af" class="cursor-pointer" />
        </Popper>
        <span
          class="inline-flex space-x-1 border text-white border-transparent rounded-md font-semibold py-1 px-2.5 text-sm"
          :style="{ backgroundColor: order.StateColor }"
          >{{ order.StateTitleShort }}</span
        >
      </div>
      <div v-if="order.LastEdit" class="text-xs text-gray-500">
        Изменен: <span>{{ order.LastEdit }}</span>
      </div>
    </div>
    <div class="w-40 shrink-0">
      <div class="font-medium">{{ order.SummOrder }} ₽</div>
      <div class="text-sm text-gray-500">
        {{ order.QtyItems }}
        <span>{{
          useNounEnding(order.QtyItems, "товар", "товара", "товаров")
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import InfoIcon20 from "@/components/UI/Icons/InfoIcon_20.vue";
import AppBadge from "@/components/UI/Badge/AppBadge.vue";
import Popper from "vue3-popper";
import AppCheckbox from "@/components/UI/Forms/AppCheckbox.vue";
import { useNounEnding } from "@/utils/helpers";
import { useProfileStore } from "@/stores/profile";

const profileStore = useProfileStore();

const props = defineProps({
  isOrderMergeMode: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Object,
  },
  mergeOrders: {
    type: Array
  }
});

const emits = defineEmits(["onOrderForMerge"]);

const MAX_ORDER_ITEMS = 12;

const getOrderItems = computed(() => {
  return props.order.Items.filter((el, index) => index < 12);
});

const selectedForMerge = ref(false);

const getSelectedOrder = computed(() => {
  return !!props.mergeOrders.find(el => el === props.order.ID)
})

// console.log(selectedOrder.value)

function handleSelectedForMerge(checked, id) {
  // console.log('selectedForMerge', checked, id)
  emits('onOrderForMerge', checked, id)

  // profileStore.ordersForMerge []

  // if (selectedForMerge.value) {
  //   profileStore.ordersForMerge.push(id);
  // } else {
  //   profileStore.ordersForMerge = profileStore.ordersForMerge.filter(
  //     (el) => el !== id
  //   );
  // }


}
</script>
