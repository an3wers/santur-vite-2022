<template>
  <div class="container">
    <div class="post-wrapper">
      <app-breadcrumbs :breadcrumbs="breadcrumbs" />
      <h1>Прием рекламаций</h1>
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 xl:col-span-8">
          <claim-form />
        </div>
      </div>
      <!-- 
              Брэдкрамбс
              Заголовок
              Форма
              Текст
           -->
    </div>
  </div>
</template>

<script setup>
import AppBreadcrumbs from "@/components/AppBreadcrumbs.vue";
import ClaimForm from "@/components/clients/ClaimForm.vue";

const breadcrumbs = [{ name: "Прием рекламаций", url: "/clients/claim" }];
</script>
