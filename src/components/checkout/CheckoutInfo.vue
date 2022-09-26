<template>
  <div class="p-6 rounded-xl bg-slate-100 sticky top-4">
    <h2>Информация о заказе</h2>
    <!-- Выбор договора -->
    
    <div class="input-block pb-4 space-y-2">
      <label class="font-semibold">Договор</label>
      <select
        class="w-full rounded-md border form-select py-2 text-base px-3 leading-5 bg-white border-transparent focus:border-primary focus:bg-white focus:ring focus:ring-blue-500 focus:ring-opacity-20"
        :value="profileStore.profile.subjInfo.dgcode || ''"
        @change="contractHandler($event.target.value)"
      >
        <option v-for="c in profileStore.getIsActiveContracts" :key="c.code" :value="c.code">
          {{ c.num }}
        </option>
      </select>
    </div>

    <!-- Информация по заказу -->
    <ul class="list-none divide-y divide-slate-300">
      <!-- Список -->
      <!-- 
                Сумма товаров
                Скидка (если есть)
                Количество позиций
                Вес заказа
                Вес товаров в наличии
                Итого

             -->
      <li class="flex justify-between py-3 items-start">
        <span>Товары</span>
        <span class="font-semibold">{{ cartStore.cartSum }} ₽</span>
      </li>
      <!-- <li class="flex justify-between py-3 items-start">
                <span>Скидка</span>
                <span class=" font-semibold">10%</span>
             </li> -->
      <li class="flex justify-between py-3 items-start">
        <span>Количество товаров</span>
        <span class="font-semibold">{{ cartStore.cartCount }}</span>
      </li>
      <li class="flex justify-between py-3 items-start">
        <span>Вес заказа</span>
        <span class="font-semibold">{{ cartStore.cartWeight }} кг</span>
      </li>
      <!-- <li class="flex justify-between py-3 items-start">
                <span>Вес товаров в наличии</span>
                <span class=" font-semibold">30 кг</span>
             </li> -->
      <li class="flex justify-between py-3 font-bold text-xl items-start">
        <span>Итого</span>
        <span>{{ cartStore.cartSum }} ₽</span>
      </li>
    </ul>
    <!-- Кнопка -->
    <div class="flex flex-col space-y-3 mt-4">
      <!-- Кнопки -->
      <app-button :disabled="!isConfirm" btnType="primary" @click="onSubmit" btnSize="lg"
        >Оформить заказ</app-button
      >
      
    </div>

    

  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import AppButton from '@/components/UI/Buttons/AppButton.vue'
import { ref } from 'vue'
import { useProfileStore } from '@/stores/profile'

const profileStore = useProfileStore()
const cartStore = useCartStore() 
const authStore = useAuthStore()

defineProps({
  isConfirm: {
    type: Boolean
  }
})

// const contarctSelected = ref(profileStore.profile.subjInfo.dgcode || '')

async function contractHandler(value) {
  //  console.log('Contract', contarctSelected.value)
  await cartStore.changeContractInCart(value)
}

const emit = defineEmits(['onClick'])

function onSubmit() {
    emit('onClick')
}

</script>
