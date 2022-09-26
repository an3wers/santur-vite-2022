<template>
  <div
    class="header bg-white relative pt-5 pb-6"
    :class="{ 'z-10': catalogStore.getIsMenu }"
  >
    <div class="container">
      <!-- Топ -->
      <div class="header-info items-center flex justify-between">
        <!-- Логотип -->
        <div class="header__logo">
          <router-link to="/"
            ><img src="../assets/images/logo-santur.svg" alt=""
          /></router-link>
        </div>
        <!-- Навигация -->
        <div class="header__nav">
          <nav-header />
        </div>
        <!-- Контакты -->
        <contacts-header />
      </div>
      <!-- # Топ -->
      <!-- START Каталог, поиск, кнопки -->
      <div class="header-main mt-4 flex space-x-6">
        <!-- Каталог -->
        <div class="header__catalog">
          <catalog-header />
          <!-- Дропдаун каталога -->

          <catalog-dropdown v-if="catalogStore.getIsMenu" />
        </div>
        <!-- Поиск -->
        <div class="header__search grow">
          <search-header />
        </div>
        <!-- Кнопки -->
        <div class="flex space-x-3">
          <!-- component Profile -->
          <header-profile />

          <div class="header__cart">
            <router-link
              class="no-underline w-36 text-gray-900 hover:text-gray-900 py-1 px-3 relative inline-flex items-center justify-end rounded-md bg-transparent border border-transparent hover:bg-blue-100 focus:outline-none focus:ring-blue-500 focus:ring focus:ring-opacity-20"
              to="/cart"
            >
              <div class="text-right">
                <div class="">Корзина</div>
                <div class="text-xs">{{ cartStore.cartSum }} ₽</div>
              </div>
              <cart-icon-24 class="ml-2" />
              <!-- Счетчик корзина -->
              <span v-if="cartStore.cartCount > 0" class="cart-badge">{{
                cartStore.cartCount < 99 ? cartStore.cartCount : "99+"
              }}</span>
            </router-link>
          </div>
        </div>
      </div>
      <!-- END Каталог, поиск, кнопки -->
    </div>
    <Teleport to="body">
      <app-modal
        @close="closeAuthModalHandler"
        modalSize="lg"
        v-if="authStore.getIsOpenAuthModal"
      >
        <template #header> Войти в профиль </template>
        <template #body>
          <p class="mb-4">
            Или <RouterLink to="/registration">зарегистрируйтесь</RouterLink>, если
            аккаунта еще нет.
          </p>
          <auth-form />
        </template>
      </app-modal>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import NavHeader from "@/components/appHeader/NavigationHeader.vue";
import ContactsHeader from "@/components/appHeader/ContactsHeader.vue";
import CatalogHeader from "@/components/appHeader/CatalogHeader.vue";
import SearchHeader from "@/components/appHeader/SearchHeader.vue";
import AppButtonLarge from "@/components/UI/Buttons/AppButtonLarge.vue";
import CatalogDropdown from "@/components/appHeader/CatalogDropdown.vue";
import CartIcon24 from "@/components/UI/Icons/CartIcon_24.vue";
import AuthForm from "@/components/forms/AuthForm.vue";
import { useCatalogStore } from "@/stores/catalog";
import { useCartStore } from "@/stores/cart";
import AppModal from "@/components/modal/AppModal.vue";
import { useAuthStore } from "@/stores/auth";
import HeaderProfile from "@/components/appHeader/HeaderProfile.vue";

const authStore = useAuthStore();
const cartStore = useCartStore();
const catalogStore = useCatalogStore();
const router = useRouter();
const route = useRoute();

function closeAuthModalHandler() {
  authStore.closeAuthModal();
}
</script>
