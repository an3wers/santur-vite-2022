<template>
  <profile-page-wrapper title="Избранные товары">
    <favorities-list
      v-if="profileStore.favorities.length && favoritiesIsUpdate"
      :products="profileStore.favorities"
      @onClickRemoveFavority="removeFavorityHandler"
    />
    <favorities-empty-state v-if="!profileStore.favorities.length && favoritiesIsUpdate" />

    <page-loader v-if="!favoritiesIsUpdate" />
    <!-- Иначе пустое состояние -->

    <!--
        Списко избранных
        Постраничная навигация ?
        Пустое состояние избранных товаров
        Лоадер
      -->
  </profile-page-wrapper>
</template>

<script setup>
import ProfilePageWrapper from "@/components/profile/ProfilePageWrapper.vue";
import { ref } from "vue";
import { useProfileStore } from "@/stores/profile";
import FavoritiesList from "@/components/profile/favorities/FavoritiesList.vue";
import PageLoader from "@/components/loaders/PageLoader.vue";
import FavoritiesEmptyState from "@/components/profile/favorities/FavoritiesEmptyState.vue";

//   definePageMeta({
//     pageTitle: 'Избранные товары'
//   })

const profileStore = useProfileStore();
const favoritiesIsUpdate = ref(true);

async function loadFavorities() {
  favoritiesIsUpdate.value = false;
  await profileStore.getFavorities();
  favoritiesIsUpdate.value = true;
}

loadFavorities();

async function removeFavorityHandler(product) {
  favoritiesIsUpdate.value = false;
  await profileStore.removeFromFavorities(product);
  await profileStore.getFavorities();
  favoritiesIsUpdate.value = true;
}
</script>
