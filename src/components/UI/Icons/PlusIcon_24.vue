<template>
    <svg xmlns="http://www.w3.org/2000/svg" :fill="color" height="24" width="24"><path d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z"/></svg>
</template>

<script setup>
    defineProps({
        color: {
            type: String,
            default: '#111827'
        },
    })
</script>