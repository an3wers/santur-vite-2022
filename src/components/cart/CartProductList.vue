<template>
    <div class="cart-product-list py-6 divide-y divide-gray-300">
        <cart-product-preview v-for="product in products" :key="product.code" :product="product" />
    </div>
</template>

<script setup>
import CartProductPreview from '@/components/cart/CartProductPreview.vue'
// import { useCartStore } from '@/stores/cart'

// const cartStore = useCartStore()

defineProps({
    products: {
        type: Array,
        default: []
    }
})

</script>