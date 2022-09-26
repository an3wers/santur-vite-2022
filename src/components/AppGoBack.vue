<template>
  <div class="pb-4 pt-1">
    <a
      class="text-gray-500 text-sm font-medium no-underline hover:text-gray-900 inline-flex items-center space-x-1"
      href="#"
      @click.prevent="goBack"
    >
      <arrow-back-20 color="#6b7280" />
      <span>Назад</span>
    </a>
  </div>
</template>

<script setup>
import ArrowBack20 from '@/components/UI/Icons/ArrowBack_20.vue'

import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  const currentHistory = router.options.history.state.back

  if (currentHistory !== null) {
    router.back()
  } else {
    router.push({ path: '/' })
  }
}
</script>
