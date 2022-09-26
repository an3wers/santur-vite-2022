<template>
    <svg xmlns="http://www.w3.org/2000/svg" :fill="color" height="20" width="20"><path d="M5 10.75v-1.5h10v1.5Z"/></svg>
</template>

<script setup>
    defineProps({
        color: {
            type: String,
            default: '#111827'
        },
    })
</script>