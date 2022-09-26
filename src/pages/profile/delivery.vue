<template>
  <div>
    <profile-page-wrapper title="Доставки">
      <div v-if="authStore.user.id && profileStore.profile.name !== 'Гость'">
        <p>Тут будут карточки доставки</p>
      </div>
      <profile-empty-state v-else />
    </profile-page-wrapper>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useProfileStore } from "@/stores/profile";
import ProfilePageWrapper from "@/components/profile/ProfilePageWrapper.vue";
import ProfileEmptyState from "@/components/profile/ProfileEmptyState.vue";

// definePageMeta({
//   pageTitle: "Доставки",
// });

const profileStore = useProfileStore();
const authStore = useAuthStore();
</script>
