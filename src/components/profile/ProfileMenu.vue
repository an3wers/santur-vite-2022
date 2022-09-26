<template>
  <div class="bg-slate-100 py-4 divide-y space-y-2 divide-slate-300 rounded-lg">
    <div class="">
      <ul class="profile-menu space-y-[2px]">
        <li
          class="profile-menu__item"
          v-for="item in getMenu"
          :key="item.alias"
        >
          <RouterLink
            class="py-2 px-4 ml-2 mr-2 flex no-underline text-gray-900 hover:bg-[#dee8f3] rounded-md"
            :to="`/profile/${item.alias}`"
          >
            {{ item.name }}
            <span
              class="ml-2 badge badge_secondary"
              v-if="
                item.alias === 'favorites' && profileStore.favorities.length
              "
              >{{ getFavoriteQty }}</span
            >
          </RouterLink>
        </li>
      </ul>
    </div>
    <div v-if="!!authStore.user.id">
      <button
        type="button"
        @click="logoutHandler"
        class="py-2 px-4 ml-2 mr-2 mt-2 text-gray-500 rounded-md hover:text-primary focus:outline-none focus:ring-blue-500 focus:ring focus:ring-opacity-20"
      >
        Выйти
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useAppMessage } from "@/stores/appMessage";
import { useProfileStore } from "@/stores/profile";
import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";
// import router from '../../router'

const appMessageStore = useAppMessage();
const authStore = useAuthStore();
const profileStore = useProfileStore();
const cartStore = useCartStore();

// const route = useRoute()
const router = useRouter();

const props = defineProps({
  menu: {
    type: Array,
    default: [],
  },
});

const getMenu = computed(() => {
  return !!authStore.user.id
    ? props.menu
    : props.menu.filter((el) => el.onlyAuth === false);
});

async function logoutHandler() {
  // await authStore.logout(route.path)

  const res = await authStore.logout();

  if (res instanceof Error) {
    // console.log('Error', res)
    appMessageStore.openWithTimer("error", res.message, "error");
  } else {
    router.push("/");

    appMessageStore.openWithTimer("info", "Вы вышли из профиля", "info");
    await authStore.setUser();
    await profileStore.loadProfile();
    await profileStore.getFavorities();
    await cartStore.getCart();
  }
}

// icon map

const getFavoriteQty = computed(() => {
  return profileStore.favorities.length || "";
});
</script>
