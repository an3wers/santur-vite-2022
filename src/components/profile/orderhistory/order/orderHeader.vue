<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 xl:col-span-9 space-y-6">
      <div class="flex justify-between items-start space-x-6">
        <div class="grow">
          <h1 class="mb-2">
            Заказ {{ id }} <span v-if="code">/ {{ code }}</span>
          </h1>
          <span class="text-gray-500">{{ date }}</span>
        </div>
        <div class="inline-flex items-center">
          <Popper hover arrow :content="statusHistory">
            <info-icon-24 color="#9ca3af" class="cursor-pointer mr-2" />
          </Popper>
          <span
            class="inline-flex space-x-1 border border-transparent text-white rounded-md font-semibold py-1.5 px-2.5 text-base"
            :style="{ backgroundColor: statusColor }"
            >{{ status }}</span
          >
          <!-- <span class="text-xs text-gray-500">Изменен: 06.03.2022, 07:15</span> -->
        </div>
      </div>
    </div>
    <div class="col-span-12 xl:col-span-3 space-y-6">
      <div class="flex justify-end space-x-3">
        <app-button :disabled="!editAvailable" btnType="secondary"
          >Изменить</app-button
        >
        <app-button :disabled="!deleteAvailable" btnType="secondary"
          >Отменить</app-button
        >

        <Menu as="div" class="relative inline-block text-left">
          <MenuButton
            class="inline-flex items-center text-center justify-center rounded-md disabled:opacity-75 py-2 text-base px-3 leading-5 bg-blue-100 border border-transparent hover:bg-blue-200 focus:outline-none focus:ring-blue-500 focus:ring focus:ring-opacity-20 text-gray-600"
          >
            <more-horize-24 color="#1f2937" />
          </MenuButton>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="origin-top-right absolute z-10 right-0 mt-2 w-48 py-2 px-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <MenuItem v-slot="{ active }">
                <button
                  @click="$emit('onPrintPage')"
                  class="flex text-left w-full text-[0.9375rem] px-4 py-2 no-underline rounded-md"
                  :class="[
                    active ? 'bg-slate-100 text-primary' : 'text-gray-900'
                  ]"
                >
                  <!-- Content -->
                  Печать
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button
                  class="flex text-left w-full text-[0.9375rem] px-4 py-2 no-underline rounded-md"
                  :class="[
                    active ? 'bg-slate-100 text-primary' : 'text-gray-900'
                  ]"
                >
                  <!-- Content -->
                  Скачать (xlsx)
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button
                  class="flex text-left w-full text-[0.9375rem] px-4 py-2 no-underline rounded-md"
                  :class="[
                    active ? 'bg-slate-100 text-primary' : 'text-gray-900'
                  ]"
                >
                  <!-- Content -->
                  Повторить
                </button>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>

        <!-- <app-button btnType="secondary">
          </app-button> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import AppButton from '@/components/UI/Buttons/AppButton.vue'
import MoreHorize24 from '@/components/UI/Icons/MoreHorize_24.vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import InfoIcon24 from '@/components/UI/Icons/InfoIcon_24.vue'
import Popper from 'vue3-popper'

defineProps({
  id: {
    type: Number
  },
  code: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: ''
  },
  statusColor: {
    type: String,
    default: ''
  },
  statusHistory: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    default: ''
  },
  editAvailable: {
    type: Boolean,
    default: false
  },
  deleteAvailable: {
    type: Boolean,
    default: false
  }
})

defineEmits(['onPrintPage'])

</script>
