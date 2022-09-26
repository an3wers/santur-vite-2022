<template>
  <div
    class="favorities-list flex flex-col pb-6 space-y-4 divide-y divide-gray-300"
  >
    <favorities-preview
      v-for="product in products"
      :product="product"
      :key="product.code"
      @onClickRemoveFavority="onRemoveFavority"
    />
  </div>
</template>

<script setup>
import FavoritiesPreview from '@/components/profile/favorities/FavoritiesPreview.vue'

defineProps({
  products: {
    type: Array,
    default: []
  }
})

const emit = defineEmits(['onClickRemoveFavority'])


function onRemoveFavority(product) {
    emit('onClickRemoveFavority', product)
}

</script>
