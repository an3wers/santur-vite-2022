<template>
    <svg xmlns="http://www.w3.org/2000/svg" :fill="color" height="20" width="20"><path d="M9.25 15v-4.25H5v-1.5h4.25V5h1.5v4.25H15v1.5h-4.25V15Z"/></svg>
</template>

<script setup>
    defineProps({
        color: {
            type: String,
            default: '#111827'
        },
    })
</script>