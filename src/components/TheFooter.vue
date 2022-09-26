<template>
  <div class="container">
    <div class="flex space-x-4 py-6 h-96">
      <div>footer</div>
      <div><router-link to="/uikit">UI KIT</router-link></div>
      <div><router-link to="/registration">Регистрация</router-link></div>
      <div>
        <button @click="checkSession('getsession')">Get session</button>
      </div>
      <div><button @click="checkSession('gettoken')">Get token</button></div>
      <div><button @click="checkShortCart">Get short cart</button></div>
      <div><button @click="checkCart">Get cart</button></div>
      <div><button @click="openMessage">Open message</button></div>
    </div>
  </div>
</template>

<script setup>
import { useAppMessage } from '@/stores/appMessage'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

const appMessage = useAppMessage()
const cartStore = useCartStore()
const authStore = useAuthStore()

async function checkSession(param) {
  const response = await useCustomFetch(`apiauth/${param}`,)
  console.log(`checkSession response: ${param} ${response.data}`)
}

async function checkShortCart() {
  await cartStore.getShortCart()
}

async function checkCart() {
  await cartStore.getCart()
}

function openMessage() {
  appMessage.openWithTimer('info', 'На странице произошла ошибка', 'info')
}


</script>
