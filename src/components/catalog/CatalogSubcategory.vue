<template>

    <div class="catalog-subcategory flex flex-col pb-4 border-b mb-6">
        <div class="text-2xl font-bold pb-4 mb-4 border-b">Категории</div>
        <div class="flex flex-col space-y-3 overflow-y-auto max-h-80 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100">
        <RouterLink class="text-gray-900 no-underline hover:text-primary pr-4" v-for="cat in subcategory" :key="cat.id" :to="`/catalog/${cat.id}`">
            {{ cat.name }}
        </RouterLink>
    </div>
    </div>

    
</template>

<script setup>

defineProps({
    subcategory: {
        type: Array,
        default: []
    }
})

</script>