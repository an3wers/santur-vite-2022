<template>
  <profile-page-wrapper title="Данные профиля">
    <!-- user profile -->
    <div v-if="authStore.user.id && profileStore.profile.name !== 'Гость'">
      <user-info-card @changePassword="toggleModalChangePassword" />
    </div>

    <!-- empty state -->
    <profile-empty-state v-else />

    <Teleport to="body">
      <app-modal
        modalSize="md"
        @close="toggleModalChangePassword"
        v-if="isOpenChangePasswordModal"
      >
        <template #header>Изменить пароль</template>
        <template #body>
          <!-- Компонент изменения пароля -->
          <change-password-modal @changePassword="changePaswordHandler" />
        </template>
      </app-modal>
    </Teleport>
  </profile-page-wrapper>
</template>

<script setup>
import ProfilePageWrapper from "@/components/profile/ProfilePageWrapper.vue";
import ProfileEmptyState from "@/components/profile/ProfileEmptyState.vue";
import UserInfoCard from "@/components/profile/userInfo/userInfoCard.vue";
import { useProfileStore } from "@/stores/profile";
// import PageLoader from "@/components/loaders/PageLoader.vue";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";
// import { useRoute } from "vue-router";
import AppModal from "@/components/modal/AppModal.vue";
import ChangePasswordModal from "@/components/profile/userInfo/ChangePasswordModal.vue";
import { useAppMessage } from "@/stores/appMessage";

const appMessage = useAppMessage();

// definePageMeta({
//   pageTitle: "Данные профиля",
// });


const profileStore = useProfileStore();
const authStore = useAuthStore();

const isOpenChangePasswordModal = ref(false);

function toggleModalChangePassword() {
  isOpenChangePasswordModal.value = !isOpenChangePasswordModal.value;
}

async function changePaswordHandler(values) {
  // console.log('Изменение пароля', values)
  const res = await profileStore.changePassword(values);
  if (res instanceof Error) {
    appMessage.open("error", res.message, "error");
  } else {
    appMessage.openWithTimer("success", "Пароль успешно изменен", "success");
    isOpenChangePasswordModal.value = false;
  }
}
</script>
