<template>
  <div class="border border-gray-300 rounded-xl p-6">
    <div class="text-2xl font-bold mb-5">
      {{ profileStore.getProfileOffice.name }}
    </div>
    <div class="space-y-2">
        <div>{{profileStore.getProfileOffice.address}}</div>
        <div>{{profileStore.getProfileOffice.phones}}</div>
    </div>
  </div>
</template>

<script setup>
// import { ref, computed } from 'vue'
import { useProfileStore } from '@/stores/profile'

const profileStore = useProfileStore()


</script>
