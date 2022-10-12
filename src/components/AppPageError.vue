<template>
  <div class="page-error text-center py-20">
    <slot><p>На странице произошла ошибка</p></slot>
    <div class="mt-6">
      <AppButton @click="$router.go(0)">Обновить страницу</AppButton>
    </div>
  </div>
</template>

<script setup>
import AppButton from "../components/UI/Buttons/AppButton.vue";
</script>
