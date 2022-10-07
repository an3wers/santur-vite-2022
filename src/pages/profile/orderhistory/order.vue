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
        :isOrderCanceling="isOrderCanceling"
        :isEditing="isEditing"
        @onPrintPage="printPageHandler"
        @onEditOrder="editOrderHandler"
        @onCancel="cancelOrderHandler"
        @onCopy="copyHandler"
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
            :orderIsConfirming="orderIsConfirming"
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
            @onInvoice="invoiceHandler(order.id)"
            @onUpd="updHandler(order.id)"
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
import { useCartStore } from "@/stores/cart";
import { useCustomFetch } from "@/utils/fetch";
import { useOrderStore } from "@/stores/order";

const appMessageStore = useAppMessage();
const cartStore = useCartStore();
const orderStore = useOrderStore();

const router = useRouter();
const route = useRoute();
const order = ref(null);
const orderIsLoaded = ref(false);
const isOrderCanceling = ref(false)
const orderIsConfirming = ref(false);
const isEditing = ref(false)

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
    orderIsLoaded.value = false;
    const resp = await useCustomFetch(`apissz/getord/?id=${id}`);
    if (resp.success) {
      order.value = resp.data;
      // console.log(order.value);
    } else {
      throw new Error("При загрузке заказа произошла ошибка");
    }
  } catch (error) {
    appMessageStore.open("error", error.message, "error");
  } finally {
    orderIsLoaded.value = true;
  }
}

loadOrder(route.params.id);

async function confirmOrderHandler(id) {
  // console.log("Confirm order", id);

  try {
    orderIsConfirming.value = true;
    const res = await useCustomFetch(`apissz/ToRealize/?id=${id}`);

    if (res.success) {
      console.log(res);
      await loadOrder(id);
      appMessageStore.openWithTimer("success", res.message, "success");
    } else {
      throw new Error(
        res.message || "При подтверждении заказа произошла ошибка"
      );
    }
  } catch (error) {
    appMessageStore.open("error", error.message, "error");
  } finally {
    orderIsConfirming.value = false;
  }
}

function printPageHandler() {
  window.print();
}

async function ordEdit(id) {
  try {
    isEditing.value = true
    const res = await useCustomFetch(`apissz/EditOrd/?id=${id}`);

    console.log("ordEdit", res);

    if (res.success) {
      orderStore.setEditOrder({ id, code: order.value.code });
      // cartStore.getShortCart();
      // cartStore.getCart();
      router.push({ path: "/cart" });
    } else {
      throw new Error(
        res.message || "При редактировании заказа произошла ошибка"
      );
    }
  } catch (error) {
    appMessageStore.open("error", error.message, "error");
  } finally {
    isEditing.value = false
  }
}

async function checkPossibleEditOrder(id) {
  // CheckPossibleEditOrd/?id=...
  try {
    const res = await useCustomFetch(`apissz/CheckPossibleEditOrd/?id=${id}`);
    // console.log('checkPossibleEditOrder', res)
    // return res.data

    if (res.success) {
      return res.data;
    } else {
      throw new Error(
        res.message || "При ридактировании заказа произошла ошибка"
      );
    }
  } catch (error) {
    // console.log(error)
    appMessageStore.open("error", error.message, "error");
  }
}

async function editOrderHandler(id) {
  const getCheck = await checkPossibleEditOrder(id);
  // console.log(getCheck)

  if (getCheck === "ok") {
    if (cartStore.cartItems.length) {
      const result = confirm(
        "В вашей корзине уже есть товары. При редактирование заказа корзина будет очищена. Редактировать заказ?"
      );
      if (result) {
        await ordEdit(id);
      } else {
        return;
      }
    } else {
      await ordEdit(id);
    }
  } else {
    appMessageStore.openWithTimer(
      "warning",
      "Редактирование заказа невозможно, обратитесь к своему менеджеру",
      "warning"
    );
  }

  // EditOrd/?id=...

  /*
    1. Запрос - редактирование
    2. Если, что-то в корзине есть, предупредить пользователя, что корзина будет очищена
    3. Редирект в корзину
    4. Получние корзины
    5. Показать полуску, что заказ редактируется

    [X]Повторение заказа: CopyOrd/?id=...
    [X]Скачивание документов: Счет - GetInvoice/?id=... , УПД - GetUpd/?id=...
    [X]Отмена заказа: CancelOrd/?id=...
    [X]Подтверждение заказа: ToRealize/?id=...


  */
}

async function invoiceHandler(id) {
  try {
    const res = await useCustomFetch(`apissz/GetInvoice/?id=${id}`);

    if (res.success) {
      // console.log(res)
      appMessageStore.openWithTimer("success", res.message, "success");
    } else {
      throw new Error(res.message || "При запросе счета произошла ошибка");
    }
  } catch (error) {
    appMessageStore.open("error", error.message, "error");
  }
}

async function updHandler(id) {
  try {
    const res = await useCustomFetch(`apissz/GetUpd/?id=${id}`);

    if (res.success) {
      // console.log(res)
      appMessageStore.openWithTimer("success", res.message, "success");
    } else {
      throw new Error(res.message || "При запросе УПД произошла ошибка");
    }
  } catch (error) {
    appMessageStore.open("error", error.message, "error");
  }
}

async function cancelOrderHandler(id) {
  try {
    isOrderCanceling.value = true
    const res = await useCustomFetch(`apissz/CancelOrd/?id=${id}`)

    if(res.success) {
      // console.log(res)
      await loadOrder(id)
    } else {
      throw new Error(res.message || 'При отмене заказа произошла ошибка')
    }

  } catch (error) {
    appMessageStore.open("error", error.message, "error");
  } finally {
    isOrderCanceling.value = false
  }
}

async function copyHandler(id) {
  try {
    const res = await useCustomFetch(`apissz/CopyOrd/?id=${id}`)

    if(res.success) {
      console.log(res)
      router.push({path: '/cart'})
      appMessageStore.openWithTimer("success", 'Заказ скопирован', "success");
    } else {
      throw new Error(res.message || 'При копировании заказа произошла ошибка')
    }

  } catch (error) {
    appMessageStore.open("error", error.message, "error");
  }
}

</script>
