<template>
    <div class="text-center py-6 space-y-6">
       <p>
        Вы не вошли в профиль
        </p>
        <app-button @click="authStore.openAuthModal">Войти</app-button>
    </div>
</template>

<script setup>
import AppButton from '@/components/UI/Buttons/AppButton.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

</script>