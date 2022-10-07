<template>
  <div v-if="isLoaded" class="default-layout flex flex-col min-h-screen">
    <the-header />
    <div class="page-wrapper grow mt-5">
      <router-view :key="$route.fullPath"></router-view>
    </div>
    <the-footer />

    <!-- Смотреть на id корзины, сейчас сделано не правильно -->
    <!-- <OrderEditBar v-if="orderStore.editOrder.id" :order="orderStore.editOrder" /> -->
    <OrderEditBar v-if="cartStore.cartId" :id="cartStore.cartId" />
    
    <Teleport to="body">
      <Transition name="fade">
        <app-message
          :type="appMessageStore?.type"
          :icon="appMessageStore?.icon"
          v-if="appMessageStore.isShow"
          >{{ appMessageStore?.message }}</app-message
        >
      </Transition>
    </Teleport>
  </div>
  <PageLoader v-else />
</template>

<script setup>
import { ref } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import AppMessage from "@/components/AppMessage.vue";
import { useAppMessage } from "@/stores/appMessage";
import { useCatalogStore } from "@/stores/catalog";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { useProfileStore } from "@/stores/profile";
import PageLoader from '@/components/loaders/PageLoader.vue'
import OrderEditBar from "@/components/profile/orderhistory/order/orderEditBar.vue";
import { useOrderStore } from '@/stores/order'

const appMessageStore = useAppMessage();

const profileStore = useProfileStore();
const catalogStore = useCatalogStore();
const authStore = useAuthStore();
const cartStore = useCartStore();
const orderStore = useOrderStore()

// const loading = ref(null)
const isLoaded = ref(false);

// loading user

async function loadState() {
  await authStore.setUser();
  await catalogStore.loadCatalog();
  await profileStore.getFavorities();
  await profileStore.loadProfile();
  // await cartStore.getShortCart();
  await cartStore.getCart()
  isLoaded.value = true;
}

loadState();


// check if catalog dawnloaded, then do not load
// if (!catalogStore.productCatalog.length) {
// await catalogStore.loadCatalog();
// // }

// // load favorities
// async function loadFavorities() {
//   await profileStore.getFavorities();
// }

// // load profile
// // TODO: fix Error state
// async function loadProfile() {
//   await profileStore.loadProfile();
// }

// await loadProfile();
// await loadFavorities();
// await cartStore.getShortCart();
</script>
