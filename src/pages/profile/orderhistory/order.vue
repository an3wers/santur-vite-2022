<template>
  <div class="container">
    <div class="order-wrapper" v-if="orderIsLoaded">
      <div class="pb-4 pt-1">
        <button
          @click="goToAllOrders"
          class="text-gray-500 text-sm font-medium no-underline hover:text-gray-900 inline-flex items-center space-x-1"
        >
          <arrow-back-20 color="#6b7280" />
          <span>Назад</span>
        </button>
      </div>
      <order-header
        :id="order.id"
        :code="order.code"
        :status="order.status"
        :statusColor="order.statuscolor"
        :statusHistory="order.status_history"
        :date="order.regdate"
        :editAvailable="order.edit_available"
        :deleteAvailable="order.delete_available"
        @onPrintPage="printPageHandler"
      />

      <!-- main -->
      <div class="grid grid-cols-12 gap-6 mt-6">
        <div class="col-span-12 xl:col-span-9 space-y-6">
          <!--
                  Информер
                  Подзаголовок + поиск
                  Список товаров     
               -->
          <order-informer
            @onConfirmOrder="confirmOrderHandler"
            :id="order.id"
            :nextstepAvailable="order.nextstep_available"
            :nextstepTitle="order.nextstep_title"
            :statusDescr="order.status_descr"
            :commentChange="order.comment_change"
            :commentGood="order.comment_good"
            :commentMoney="order.comment_money"
          />
          <order-table :items="order.items" />
        </div>
        <div class="col-span-12 xl:col-span-3 space-y-6">
          <!-- 
                  Информация о заказе
                  Документы
                  Комментарии
               -->
          <order-info
            :costGoodiesS="order.cost_goodies_s"
            :discountS="order.discount_s"
            :qtyGoodies="order.qty_goodies"
            :summaryS="order.summary_s"
            :costDeliveryS="order.cost_delivery_s"
            :weightSummary="order.weight_summary"
            :weightAvailable="order.weight_available"
            :receivingAddress="order.receiving_address"
            :receivingMethod="order.receiving_method"
            :discount="order.discount"
          />
          <order-documents
            :getchetAvailable="order.getchet_available"
            :getupdAvailable="order.getupd_available"
          />
          <order-comments :comment="order.comment" />
        </div>
      </div>
    </div>
    <!-- <page-loader v-if="!orderIsLoaded" /> -->
    <page-loader v-else />
  </div>
</template>

<script setup>
import ArrowBack20 from "@/components/UI/Icons/ArrowBack_20.vue";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import orderHeader from "@/components/profile/orderhistory/order/orderHeader.vue";
import orderInformer from "@/components/profile/orderhistory/order/orderInformer.vue";
import orderInfo from "@/components/profile/orderhistory/order/orderInfo.vue";
import orderDocuments from "@/components/profile/orderhistory/order/orderDocuments.vue";
import orderComments from "@/components/profile/orderhistory/order/orderComments.vue";
import orderTable from "@/components/profile/orderhistory/order/orderTable.vue";
import { useAppMessage } from "@/stores/appMessage";
import PageLoader from "@/components/loaders/PageLoader.vue";

import { useCustomFetch } from '@/utils/fetch'

const appMessageStore = useAppMessage();

const router = useRouter();
const route = useRoute();
const order = ref(null);
const orderIsLoaded = ref(false);

// Go back button
function goToAllOrders() {
  const currentHistory = router.options.history.state.back;
  if (currentHistory !== null) {
    router.back();
  } else {
    router.push({ path: "/profile/orderhistory" });
  }
}

async function loadOrder(id) {
  try {
    const resp = await useCustomFetch(`apissz/getord/?id=${id}`);
    if (resp.success) {
      order.value = resp.data;
    } else {
      throw new Error("При загрузке заказа произошла ошибка");
    }
  } catch (error) {
    console.log(error.message);
    appMessageStore.open("error", error.message, "error");
  } finally {
    orderIsLoaded.value = true;
  }
}

loadOrder(route.params.id);

function confirmOrderHandler(id) {
  console.log("Confirm order", id);
}

function printPageHandler() {
  window.print();
}

// Изменение заказа, удаление заказа
</script>
