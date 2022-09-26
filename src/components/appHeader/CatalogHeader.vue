<template>
    <app-button-large @click="handleClick" :class="[catalogStore.getIsMenu ? ' text-primary border-primary ring ring-blue-200 ring-opacity-50' : 'text-white border-transparent bg-primary hover:bg-primary-hover']" class="rounded-md">
        <dots-grid-icon-24 color="#ffffff" v-if="!catalogStore.getIsMenu" class="mr-1" />
        <close-icon-24 color="#1976D2" v-if="catalogStore.getIsMenu" class="mr-1" />
        Каталог
    </app-button-large>
</template>

<script setup>
import DotsGridIcon24 from '@/components/UI/Icons/DotsGridIcon_24.vue'
import CloseIcon24 from '@/components/UI/Icons/CloseIcon_24.vue'
import AppButtonLarge from '@/components/UI/Buttons/AppButtonLarge.vue'

import { useCatalogStore } from '@/stores/catalog'

const catalogStore = useCatalogStore()

function handleClick() {
    catalogStore.handleMenu()
}


</script>