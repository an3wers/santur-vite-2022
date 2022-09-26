<template>
  <div class="border rounded-xl">
    <div class="p-6 bg-slate-100">
      <div class="font-semibold text-lg">
        Если вы не нашли нужный товар, добавьте в свободной форме, указав:
        название, количество и предполагаемую цену.
      </div>
    </div>
    <div class="p-6">
      <form @submit.prevent="onSubmit">
        <div class="flex items-end space-x-4">
          <div class="input-group grow space-y-2">
            <label for="productFreeName">Товар</label>
            <app-input type="text" inputType="border" inputSize="md" id="productFreeName" placeholder="Введите название" v-model="freeProduct.name" />
          </div>
          <div class="input-group w-40 space-y-2">
            <label for="productFreePrice">Цена, ₽</label>
            <app-input type="number" inputType="border" inputSize="md" id="productFreePrice" placeholder="0,00" v-model="freeProduct.price" />
          </div>
          <div class="input-group w-40 space-y-2">
            <label for="productFreeAmount">Количество</label>
            <app-input type="number" inputType="border" inputSize="md" id="productFreeAmount" placeholder="0" v-model="freeProduct.amount" />
          </div>
        </div>
        <app-button type="submit" class="mt-4">Добавить товар</app-button>
      </form>
    </div>
  </div>
</template>

<script setup>
import AppInput from '@/components/UI/Forms/AppInput.vue'
import AppButton from '@/components/UI/Buttons/AppButton.vue'

import { reactive } from 'vue'

const freeProduct = reactive({
    name: '',
    amount: '',
    price: ''
})

function onSubmit() {
    console.log('Free product', freeProduct)
    freeProduct.name = ''
    freeProduct.amount = ''
    freeProduct.price = ''
}

</script>
