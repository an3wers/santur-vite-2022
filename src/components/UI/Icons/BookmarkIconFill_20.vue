<template>
    <svg xmlns="http://www.w3.org/2000/svg" :fill="color" height="20" width="20"><path d="M5 17V4.5q0-.625.438-1.062Q5.875 3 6.5 3h7q.625 0 1.062.438Q15 3.875 15 4.5V17l-5-2Z"/></svg>
</template>

<script setup>
    defineProps({
        color: {
            type: String,
            default: '#111827'
        },
    })
</script>