<template>
  <div class="py-3 bg-gray-700 fixed bottom-0 left-0 right-0">
    <div class=" container">
      <div class=" text-white flex space-x-6 justify-center items-center">
        <span>Редактирование заказа №{{id}}</span>
        <AppButton btnSize="xs" btnType="outline">Отменить изменеия</AppButton>
        <AppButton btnSize="xs" btnType="outline">Сохранить заказ</AppButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppButton from '@/components/UI/Buttons/AppButton.vue';

defineProps({
  id: {
    type: Number,
  },
});
</script>
