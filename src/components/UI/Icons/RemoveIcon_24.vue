<template>
    <svg xmlns="http://www.w3.org/2000/svg" :fill="color" height="24" width="24"><path d="M5 13v-2h14v2Z"/></svg>
</template>

<script setup>
    defineProps({
        color: {
            type: String,
            default: '#111827'
        },
    })
</script>