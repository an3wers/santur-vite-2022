<template>
    <div>
          <profile-page-wrapper title="Филиал Сантехкомплект-Урал">
          <div v-if="authStore.user.id && profileStore.profile.name !== 'Гость'">
            <office-list />
          </div>
    
          <!-- empty state -->
          <profile-empty-state v-else />
        </profile-page-wrapper>
    </div>
    
     
    </template>
    
    <script setup>
    import ProfilePageWrapper from '@/components/profile/ProfilePageWrapper.vue'
    import { useProfileStore } from '@/stores/profile'
    import ProfileEmptyState from '@/components/profile/ProfileEmptyState.vue'
    import OfficeList from '@/components/profile/office/OfficeList.vue'
    import { useAuthStore } from '@/stores/auth'
    
    // definePageMeta({
    //   pageTitle: 'Филиал Сантехкомплект-Урал'
    // })
    
    const authStore = useAuthStore()
    const profileStore = useProfileStore()
    </script>
    