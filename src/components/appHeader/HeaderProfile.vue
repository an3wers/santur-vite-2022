<template>
  <div class="header__profile">
    <Menu as="div" class="relative inline-block text-left">
      <MenuButton
        @click="profileHandler"
        class="py-1 px-3 relative inline-flex items-center rounded-md bg-transparent border border-transparent hover:bg-blue-100 focus:outline-none focus:ring-blue-500 focus:ring focus:ring-opacity-20"
      >
        <!-- Content -->
        <div class="text-right">
          <div class="">Личный кабинет</div>
          <div class="text-xs">{{ authStore.getUserNameForHeader }}</div>
        </div>
        <account-icon-24 class="ml-2" />
        <span
          v-if="authStore.$state.user.id"
          class="absolute w-2 h-2 rounded-full bg-red-500 right-2 top-2"
        ></span>
      </MenuButton>

      <!-- START dropdown -->
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          class="origin-top-left text-left absolute z-10 left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div class="py-2 px-1">
            <div
              class="px-5 mb-1 pb-2 -ml-1 -mr-1 border-gray-300 border-b text-sm font-medium"
              v-if="!!authStore.user.id"
            >
              <div class="text-gray-500">Профиль</div>
              <div class="">{{ profileStore.profile?.email }}</div>
            </div>

            <MenuItem v-if="!authStore.user.id" v-slot="{ active }">
              <button
                @click="onClickAuthHandler"
                class="flex text-left w-full text-[0.9375rem] px-4 py-2 no-underline rounded-md"
                :class="[
                  active ? 'bg-slate-100 text-primary' : 'text-gray-900',
                ]"
              >
                <!-- Content -->
                Войти
              </button>
            </MenuItem>

            <MenuItem
              v-for="item in getDropdownMenu"
              :key="item.alias"
              v-slot="{ active }"
            >
              <button
                @click="$router.push(`/profile/${item.alias}`)"
                class="flex text-left w-full px-4 py-2 text-[0.9375rem] no-underline rounded-md"
                :class="[
                  active ? 'bg-slate-100 text-primary' : 'text-gray-900',
                ]"
              >
                {{ item.name }}
                <span
                  class="ml-2 badge badge_light"
                  v-if="
                    item.alias === 'favorites' && profileStore.favorities.length
                  "
                  >{{ getFavoriteQty }}</span
                >
              </button>
            </MenuItem>

            <MenuItem v-if="!!authStore.user.id" v-slot="{ active }">
              <button
                @click="onClickLogoutHandler"
                class="flex text-left w-full text-[0.9375rem] px-4 py-2 no-underline rounded-md"
                :class="[
                  active ? 'bg-slate-100 text-primary' : 'text-gray-500',
                ]"
              >
                <!-- Content -->
                Выйти
              </button>
            </MenuItem>

            <div
              v-if="!!authStore.user.id"
              class="px-5 mt-1 py-2 rounded-b-md -mb-2 -ml-1 -mr-1 border-gray-300 border-t bg-slate-100 text-sm font-medium"
            >
              <div class="text-gray-500 text-sm">Компания</div>
              <div class="text-sm">
                {{ useStrCrop(profileStore.profile?.subjInfo?.name, 60) }}
              </div>
            </div>
          </div>
        </MenuItems>
      </transition>
      <!-- END dropdown -->
    </Menu>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import AccountIcon24 from "@/components/UI/Icons/AccountIcon_24.vue";
import { useProfileStore } from "@/stores/profile";
import { useAuthStore } from "@/stores/auth";
import { useAppMessage } from "@/stores/appMessage";
import { useCartStore } from "@/stores/cart";
import { useStrCrop } from "@/utils/helpers";

const authStore = useAuthStore();
const profileStore = useProfileStore();
const appMessageStore = useAppMessage();
const cartStore = useCartStore();

defineEmits([]);

const route = useRoute();
const router = useRouter();

// Открываем модальное окно входа
function onClickAuthHandler() {
  authStore.openAuthModal();
}

async function onClickLogoutHandler() {
  
  const res = await authStore.logout();

  if(res instanceof Error) {
    appMessageStore.open('error', res.message, 'error')
  } else {

    if(route.path.includes('profile') || route.path.includes('checkout')) {
      router.push('/')
    }

    await authStore.setUser()
    await cartStore.getCart()
    await profileStore.loadProfile()
    await profileStore.getFavorities()
    appMessageStore.openWithTimer('info', 'Вы вышли из профиля', 'info')

  }

}

const getDropdownMenu = computed(() => {
  return !!authStore.user.id
    ? profileStore.menu
    : profileStore.menu.filter((el) => el.onlyAuth === false);
});

const getFavoriteQty = computed(() => {
  return profileStore.favorities.length || "";
});

async function profileHandler() {
  await profileStore.getFavorities();
}
</script>
