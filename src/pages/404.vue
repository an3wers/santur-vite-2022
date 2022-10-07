<template>
  <div class="container">
    <div class="py-8 text-center">
      <h1>Ошибка 404</h1>
      <p>Страница, которую вы запрашиваете, не существует</p>
      <app-button @click="$router.push({ path: '/' })" btnSize="lg"
        >Перейти на главную</app-button
      >
    </div>
  </div>
</template>

<script setup>
import AppButton from '@/components/UI/Buttons/AppButton.vue';
</script>
