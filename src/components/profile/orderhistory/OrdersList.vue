<template>
  <div class="py-6 px-5 border border-gray-300 rounded-xl relative">
    <div class="divide-y divide-gray-300">
      <order-preview
        v-for="order in orders"
        :key="order.ID"
        :order="order"
        :isOrderMergeMode="isOrderMergeMode"
        :mergeOrders="mergeOrders"
        @onOrderForMerge="onMerge"
      />
    </div>
    <page-loader v-if="!isLoaded" />
    <orders-empty-state v-if="!orders.length" />
  </div>
</template>

<script setup>
import OrderPreview from '@/components/profile/orderhistory/OrderPreview.vue'
import OrdersEmptyState from '@/components/profile/orderhistory/OrdersEmptyState.vue'
import PageLoader from '@/components/loaders/PageLoader.vue'

defineProps({
  isLoaded: {
    type: Boolean,
    default: false
  },
  orders: {
    type: Array,
    default: []
  },
  isOrderMergeMode: {
    type: Boolean
  },
  mergeOrders: {
    type: Array
  }
})

const emits = defineEmits(['merge'])

function onMerge(selected, id) {
  // console.log(selected, id)
  emits('merge', selected, id)

}
</script>
