<template>
  <profile-page-wrapper title="Обратная связь">
    <div class="space-y-6">
      <app-informer type="primary" icon="info">
        <div>
          <div class="text-lg font-semibold">Прием рекламаций</div>
          <p>
            У вас претензия или рекламация? Воспользуйтесь сервисом для приема
            рекламаций.
          </p>
        </div>
        <app-button class="-ml-4" btnType="link">Подать рекламацию</app-button>
      </app-informer>

      <form-feedback v-if="feedbackIsLoaded" />
    </div>
  </profile-page-wrapper>
</template>

<script setup>
import ProfilePageWrapper from "@/components/profile/ProfilePageWrapper.vue";
// import { useProfileStore } from '@/stores/profile'
import FormFeedback from "@/components/profile/feedback/FormFeedback.vue";
import AppInformer from "@/components/AppInformer.vue";
import AppButton from "@/components/UI/Buttons/AppButton.vue";
import { onMounted, ref } from "vue";

const feedbackIsLoaded = ref(false);

onMounted(() => {
  feedbackIsLoaded.value = true;
});

// definePageMeta({
//   pageTitle: "Обратная связь",
// });

// const profileStore = useProfileStore()
</script>
