<template>
  <div class="header__contacts flex items-center space-x-4 header-contacts">
    <span class="font-semibold"
      ><a class="no-underline text-gray-900" :href="`tel:${PHONE_SITE}`">{{
        phoneFormatter(PHONE_SITE)
      }}</a></span
    >
    <div class="hidden xl:flex items-center">
      <Popper hover arrow content="Написать на эл. адрес">
        <a
          class="inline-flex mr-4 items-center text-center justify-center rounded-md disabled:opacity-75 bg-blue-100 border border-transparent hover:bg-blue-200 focus:outline-none focus:ring-slate-500 focus:ring focus:ring-opacity-20 text-gray-800 py-2 text-base px-2 leading-5"
          target="_blank"
          :href="`mailto:${EMAIL_SITE}`"
        >
          <email-icon-24 />
        </a>
      </Popper>
      <Popper hover arrow content="Написать в WhatsApp ">
        <a
          class="inline-flex items-center text-center justify-center rounded-md disabled:opacity-75 bg-blue-100 border border-transparent hover:bg-blue-200 focus:outline-none focus:ring-slate-500 focus:ring focus:ring-opacity-20 text-gray-800 py-2 text-base px-2 leading-5"
          target="_blank"
          :href="`https://wa.me/${WHATSAPP_SITE}`"
        >
          <whatsapp-icon-24 />
        </a>
      </Popper>
    </div>

    <!-- Написать на эл. адрес Написать в WhatsApp  -->

    <!-- <a class="hidden xl:inline-block" target="_blank" :href="`mailto: ${EMAIL_SITE}`">
      <app-button-regular-icon
        class="bg-slate-200 rounded-full hover:bg-slate-300 text-gray-600"
      >
      </app-button-regular-icon>
    </a>
    <a class="hidden xl:inline-block" target="_blank" :href="`https://wa.me/${WHATSAPP_SITE}`">
      <app-button-regular-icon
        class="bg-slate-200 rounded-full hover:bg-slate-300 text-gray-600"
      >
      </app-button-regular-icon>
    </a> -->
  </div>
</template>

<script setup>
import EmailIcon24 from "@/components/UI/Icons/EmailIcon_24.vue";
import WhatsappIcon24 from "@/components/UI/Icons/WhatsappIcon_24.vue";
import AppButtonRegularIcon from "@/components/UI/Buttons/AppButtonRegularIcon.vue";
import { useConfig } from "@/utils/config";
import { phoneFormatter } from "@/utils/helpers";
import Popper from "vue3-popper";

const { PHONE_SITE, EMAIL_SITE, WHATSAPP_SITE } = useConfig();
</script>
