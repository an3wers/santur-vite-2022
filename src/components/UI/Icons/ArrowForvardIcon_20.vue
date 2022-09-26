<template>
    <svg xmlns="http://www.w3.org/2000/svg" :fill="color" height="20" width="20"><path d="M6.729 18.333 5.208 16.792 12 10 5.208 3.208 6.729 1.667 15.062 10Z"/></svg>
</template>

<script setup>
    defineProps({
        color: {
            type: String,
            default: '#111827'
        },
    })
</script>