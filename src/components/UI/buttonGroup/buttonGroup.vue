<template>
    <div class="btn-group__content mt-4" v-if="title === selectedTitle">
        <slot />
    </div>
</template>

<script>
import { inject } from 'vue'

export default {
    props: ['title'],
    setup() {
        const selectedTitle = inject('selectedTitle')

        return {
            selectedTitle
        }
    },
}
</script>