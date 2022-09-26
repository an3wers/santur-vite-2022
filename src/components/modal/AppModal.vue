<template>  
<!-- h-modal md:h-full -->
  <div
    tabindex="-1"
    aria-hidden="true"
    class="modal-area overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 justify-center items-center flex"
    @mousedown="onClose($event, 'area')"
  >
  <!-- h-full md:h-auto-->
    <div :class="[sizeMap[modalSize]]" class="relative p-4 w-full">
      <!-- Modal content -->
      <div class="bg-white rounded-lg shadow">

        <div class="p-6 space-y-6">
          <!-- Header -->
          <div class="flex justify-between items-start">
            <div class="text-xl font-bold">
              <slot name="header">Заголовок</slot>
            </div>
            <button
              @click="onClose($event, 'closeBtn')"
              class="ml-4 modal-close-btn"
              aria-label="close"
            >
              <close-icon-24 color="#111827" />
            </button>
          </div>
          <!-- Body -->
          <div class=" overflow-y-auto app-modal-body scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200">
            <slot name="body">Содержание модального окна</slot>
          </div>
        </div>
        <!-- Modal footer -->
      </div>
    </div>
  </div>
  <div
    modal-backdrop=""
    class="bg-gray-900 bg-opacity-50 fixed inset-0 z-40"
  ></div>
</template>

<script setup>
import CloseIcon24 from '@/components/UI/Icons/CloseIcon_24.vue'

defineProps({
  modalSize: {
    type: String,
    default: 'md'
  }
})

const emit = defineEmits(['close'])

const sizeMap = {
  'xs': 'max-w-xs',
  'md': 'max-w-md',
  'lg': 'max-w-lg',
  'xl': 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
}

document.body.classList.add('modal-open')

function onClose(event, el) {

  if(el === 'closeBtn' || event.target.classList.contains('modal-area')) {
    emit('close', event)
    document.body.classList.remove('modal-open')
  }

}
</script>
