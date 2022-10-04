<template>
  <div class="py-3 bg-green-400 fixed bottom-0 left-0 right-0">
    <div class="text-center">
      Редактирование заказа №{{ order.id }}/
      <span v-if="order.code">{{ order.code }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  order: {
    type: Object,
  },
});
</script>
