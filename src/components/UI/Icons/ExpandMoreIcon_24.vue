<template>
    <svg xmlns="http://www.w3.org/2000/svg" :fill="color" height="24" width="24"><path d="M12 15.375 6 9.375 7.4 7.975 12 12.575 16.6 7.975 18 9.375Z"/></svg>
</template>

<script setup>
    defineProps({
        color: {
            type: String,
            default: '#111827'
        },
    })
</script>