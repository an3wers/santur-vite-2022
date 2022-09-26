<template>
  <div class="sale-products mb-20">
    <!-- Заголовок -->
    <section-title>
      <template #title>Распродажа</template>
      <template #button>
        <app-button btnType="secondary">
          Больше товаров
          <arrow-right-alt-icon-20 class="ml-1" color="#4b5563" />
        </app-button>
      </template>
    </section-title>
    <!-- Список товаров -->
    <sale-products-list  />
  </div>
</template>

<script setup>
import SectionTitle from '@/components/homePage/SectionTitle.vue'
import AppButton from '@/components/UI/Buttons/AppButton.vue'
import ArrowRightAltIcon20 from '@/components/UI/Icons/ArrowRightAltIcon_20.vue'
import SaleProductsList from '@/components/homePage/SaleProductsList.vue'
// import { computed} from 'vue'
// import {useHomeStore} from '@/stores/home'


</script>
