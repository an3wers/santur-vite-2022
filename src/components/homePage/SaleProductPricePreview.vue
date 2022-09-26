<template>
  <div
    class="carousel__item sale-products-list__product product-body flex flex-col space-y-1"
  >
    <div
      class="block w-full min-h-40 p-4 aspect-square overflow-hidden relative"
    >
      <RouterLink
        :to="`/product/${product.code}`"
        class="product-body__img-link"
      >
        <img
          class="object-contain w-full h-full"
          :src="product.imgpath"
          :alt="product.name"
        />
      </RouterLink>

      <div class="absolute top-0 right-0">
        <Popper
          v-if="!product.isfavority"
          arrow
          hover
          content="В&nbsp;избранное"
        >
          <app-button-icon
            @click="$emit('onAddFavority', product.code)"
            btnSize="xs"
            btnType="light"
          >
            <bookmark-icon-20 color="#6b7280" />
          </app-button-icon>
        </Popper>

        <Popper v-else arrow hover content="Удалить из&nbsp;избранного">
          <button
            @click="$emit('onRemoveFavority', product.code)"
            class="py-1 text-sm px-2 bg-transparent border border-transparent hover:bg-blue-100 focus:outline-none focus:ring-slate-500 focus:ring focus:ring-opacity-20 inline-flex items-center text-center justify-center rounded-md disabled:opacity-75"
          >
            <bookmark-icon-fill-20 color="#1976D2" />
          </button>
        </Popper>
      </div>
    </div>

    <div class="h-36 space-y-1">
      <div class="text-xs text-secondary-text">{{ product.code }}</div>
      <div class="product-body__name text-sm leading-snug">
        <RouterLink
          :to="`/product/${product.code}`"
          class="product-body__name-link no-underline text-gray-900 hover:text-primary"
        >
          {{ product.name }}
        </RouterLink>
      </div>
      <!-- <div class="product-body__stock">
            <span class="text-sm">{{prod.stock}}</span>
          </div> -->
    </div>

    <div class="space-y-1">
      <div class="product-body__price flex items-baseline space-x-2">
        <span class="font-semibold">{{ product.prices }} ₽</span>
        <span class="text-sm text-secondary-text">/{{ product.ed }}</span>
      </div>
      <div
        v-if="!product.qty_incart"
        class="product-body__btn flex items-baseline space-x-2"
      >
        <!-- <app-button btnType="primary" @click="addToCartHandler(product.code, product.salekrat)" btnSize="xs"> -->
        <app-button
          btnType="primary"
          @click="onAdd(product.code, product.salekrat)"
          btnSize="xs"
        >
          <svg
            v-if="isBtnSpinner"
            role="status"
            class="inline mr-3 w-4 h-4 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          В корзину
        </app-button>
        <span class="text-sm text-secondary-text"
          >по {{ product.salekrat }} {{ product.ed }}.</span
        >
      </div>

      <RouterLink
        to="/cart"
        v-else
        class="no-underline py-1 text-sm px-2 inline-flex items-center text-center justify-center rounded-md bg-blue-100 border border-transparent hover:bg-blue-200 hover:text-gray-800 focus:outline-none focus:ring-blue-500 focus:ring focus:ring-opacity-20 text-gray-800"
      >
        В корзине
        <span class="text-sm ml-1">
          {{ product.qty_incart }} {{ product.ed }}.
        </span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import AppButton from "@/components/UI/Buttons/AppButton.vue";
import AppButtonIcon from "@/components/UI/Buttons/AppButtonIcon.vue";
import { ref, computed, watch } from "vue";
import BookmarkIcon20 from "@/components/UI/Icons/BookmarkIcon_20.vue";
import BookmarkIconFill20 from "@/components/UI/Icons/BookmarkIconFill_20.vue";
import Popper from "vue3-popper";

const isBtnSpinner = ref(false);

const props = defineProps({
  product: {
    type: Object,
  },
});

const emit = defineEmits(["onAddCart", "onAddFavority", "onRemoveFavority"]);

watch(props.product, () => {
  isBtnSpinner.value = false;
});

function onAdd(id, count) {
  isBtnSpinner.value = true;
  emit("onAddCart", id, count);
}

// Добавление в избранное
</script>
