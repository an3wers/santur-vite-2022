<template>
  <div class="header__contacts flex items-center space-x-4 header-contacts">
    <span class="font-semibold">{{ PHONE_SITE }}</span>
    <a class="hidden xl:inline-block" target="_blank" :href="`mailto: ${EMAIL_SITE}`">
      <app-button-regular-icon
        class="bg-slate-200 rounded-full hover:bg-slate-300 text-gray-600"
      >
        <email-icon-24 />
      </app-button-regular-icon>
    </a>
    <a class="hidden xl:inline-block" target="_blank" :href="`https://wa.me/${WHATSAPP_SITE}`">
      <app-button-regular-icon
        class="bg-slate-200 rounded-full hover:bg-slate-300 text-gray-600"
      >
        <whatsapp-icon-24 />
      </app-button-regular-icon>
    </a>
  </div>
</template>

<script setup>
import EmailIcon24 from '@/components/UI/Icons/EmailIcon_24.vue'
import WhatsappIcon24 from '@/components/UI/Icons/WhatsappIcon_24.vue'
import AppButtonRegularIcon from '@/components/UI/Buttons/AppButtonRegularIcon.vue'
import { useConfig } from '@/utils/config.js'

const { PHONE_SITE, EMAIL_SITE, WHATSAPP_SITE } = useConfig()
</script>
