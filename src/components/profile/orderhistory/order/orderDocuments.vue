<template>
  <div class="p-6 rounded-xl bg-slate-100">
    <h2>Документы</h2>
    <ul class="list-none space-y-4">
      <li class="flex space-x-2">
        <!-- icon -->

        <file-icon-24
          :class="{ 'opacity-50': !getchetAvailable }"
          color="#1976D2"
        />
        <div class="flex items-start flex-col">
          <button
          @click="$emit('onInvoice')"
            class="bg-transparent border border-transparent hover:text-primary-hover focus:outline-none focus:ring-blue-500 focus:ring focus:ring-opacity-20 hover:no-underline text-primary underline rounded-md disabled:opacity-70"
            :disabled="!getchetAvailable"
          >
            Счет на оплату
          </button>
          <span v-if="!getchetAvailable" class="text-sm text-gray-500"
            >Счет на оплату недоступен</span
          >
          <span v-else class="text-sm text-gray-500"
            >Счет будет отправлен на ваш email</span
          >
        </div>
      </li>

      <li class="flex space-x-2">
        <!-- icon -->
        <file-icon-24
          :class="{ 'opacity-50': !getupdAvailable }"
          color="#1976D2"
        />
        <div class="flex flex-col">
          <button
          @click="$emit('onUpd')"
            :disabled="!getupdAvailable"
            class="bg-transparent border border-transparent hover:text-primary-hover focus:outline-none focus:ring-blue-500 focus:ring focus:ring-opacity-20 hover:no-underline text-primary underline rounded-md disabled:opacity-70 text-left"
          >
            Универсальный передаточный документ
          </button>
          <span v-if="!getupdAvailable" class="text-sm text-gray-500"
            >УПД недоступен, по заказу небыло отгрузок</span
          >
          <span v-else class="text-sm text-gray-500"
            >УПД будет отправлен на ваш email</span
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import FileIcon24 from "@/components/UI/Icons/FileIcon_24.vue";
import Popper from "vue3-popper";

defineProps({
  getchetAvailable: {
    type: Boolean,
    default: false,
  },
  getupdAvailable: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['onInvoice', 'onUpd'])

// documents handlers
</script>
