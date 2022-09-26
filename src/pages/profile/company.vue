<template>
    <div>
          <profile-page-wrapper title="Мои компании">
          <div v-if="authStore.user.id && profileStore.profile.name !== 'Гость'" class="space-y-6">
            <company-list />
            <company-documents />
          </div>
          <profile-empty-state v-else />
        </profile-page-wrapper>
    </div>
    
    </template>
    
    <script setup>
    import { useAuthStore } from '@/stores/auth'
    import ProfileEmptyState from '@/components/profile/ProfileEmptyState.vue'
    import CompanyList from '@/components/profile/company/CompanyList.vue'
    import CompanyDocuments from '@/components/profile/company/CompanyDocuments.vue'
    import ProfilePageWrapper from '@/components/profile/ProfilePageWrapper.vue'
    import { useProfileStore } from '../../stores/profile'
    
    // definePageMeta({
    //   pageTitle: 'Мои компании'
    // })
    
    const authStore = useAuthStore()
    const profileStore = useProfileStore()
    </script>
    