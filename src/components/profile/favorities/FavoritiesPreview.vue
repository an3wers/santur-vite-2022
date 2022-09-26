<template>
  <div class="flex space-x-4 pt-4 first:pt-0">
    <div class="shrink-0 w-24 h-24">
      <img
        :src="product.imgpath"
        class="w-full h-full object-contain"
        :alt="product.name"
      />
    </div>
    <div class="grow">
      <div class="flex flex-col h-full space-y-2">
        <div class="text-xs text-secondary-text">{{ product.code }}</div>
        <div class="grow">
          <RouterLink
            class="no-underline text-gray-900 hover:text-primary"
            :to="`/product/${product.code}`"
            >{{ product.name }}</RouterLink
          >
        </div>
        <!-- <div class="flex space-x-2">
                    <app-button btnType="outline" btnSize="xs">Комплектующие</app-button>
                    <app-button btnType="outline" btnSize="xs">Аналоги</app-button>
                </div> -->
      </div>
    </div>
    <div class="flex flex-col flex-nowrap shrink-0 w-52 space-y-3">
      <div class="flex items-center justify-between grow">
        <div>
          <span class="font-semibold text-lg">{{ product.prices }} ₽</span>
          <span class="ml-1 text-sm text-secondary-text"
            >/{{ product.ed }}.</span
          >
        </div>
        <app-button @click="onRemoveFavority(product.code)" btnType="light">
          <bookmark-icon-fill-20 color="#1976D2" />
        </app-button>
      </div>
      <div
        class="inline-flex space-x-1"
        v-if="product.incash_info === 'В наличии'"
      >
        <check-circle-20 color="#16a34a" />
        <span class="text-sm text-secondary-text"
          >{{ product.incash_info }}: {{ product.incash }}
          {{ product.ed }}.</span
        >
      </div>
      <div
        class="inline-flex space-x-1"
        v-else-if="product.incash_info === 'Под заказ'"
      >
        <schedule-icon-20 color="#9ca3af" />
        <span class="text-sm text-secondary-text">{{
          product.incash_info
        }}</span>
      </div>

      <div class="inline-flex space-x-1" v-else>
        <shipping-icon-20 color="#9ca3af" />
        <span class="text-sm text-secondary-text">{{
          product.incash_info
        }}</span>
      </div>

      <!-- Если не добавелно в корзину -->
      <div v-if="!isInCart" class="flex items-center justify-between">
        <div>
          <app-button @click="addCartHandler">
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
        </div>
        <div class="text-sm text-secondary-text">
          По {{ product.salekrat }} {{ product.ed }}.
        </div>
      </div>
      <!-- Если в корзине -->
      <div v-else class="relative flex items-center w-40 mt-3">
        <app-button-icon
          :disabled="!isRemoveBtn"
          btnType="light"
          btnSize="xs"
          aria-label="Уменьшить"
          class="absolute left-2"
          @click="changeValueHandler('remove', product.code)"
        >
          <remove-icon-20 />
        </app-button-icon>
        <!-- @input="setNewValue" -->
        <input
          type="number"
          v-model="productAmountInCart"
          :placeholder="product.salekrat"
          :step="product.salekrat"
          :min="product.salekrat"
          :max="MAXPRODUCT_COUNT"
          @blur="setNewValue"
          @keypress.enter="$event.target.blur()"
          class="w-full rounded-md border form-input bg-transparent border-gray-300 focus:border-primary focus:ring focus:ring-blue-200 focus:ring-opacity-50 py-2 text-center text-base px-6 leading-5"
        />
        <app-button-icon
          :disabled="!isAddBtn"
          btnType="light"
          btnSize="xs"
          aria-label="Добавить"
          class="absolute right-2"
          @click="changeValueHandler('add', product.code)"
        >
          <plus-icon-20 />
        </app-button-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppButton from '@/components/UI/Buttons/AppButton.vue'
import CheckIcon20 from '@/components/UI/Icons/CheckIcon_20.vue'
import CheckCircle20 from '@/components/UI/Icons/CheckCircle_20.vue'
import ScheduleIcon20 from '@/components/UI/Icons/ScheduleIcon_20.vue'
import ShippingIcon20 from '@/components/UI/Icons/ShippingIcon_20.vue'
import AppButtonIcon from '@/components/UI/Buttons/AppButtonIcon.vue'
import BookmarkIconFill20 from '@/components/UI/Icons/BookmarkIconFill_20.vue'
import PlusIcon20 from '@/components/UI/Icons/PlusIcon_20.vue'
import RemoveIcon20 from '@/components/UI/Icons/RemoveIcon_20.vue'
import { useToFixedNumber, setCountProduct } from '@/utils/helpers'
import { useProfileStore } from '@/stores/profile'
import { useCartStore } from '@/stores/cart'

const profileStore = useProfileStore()
const cartStore = useCartStore()

const props = defineProps({
  product: {
    type: Object
  }
})

const emit = defineEmits(['onClickRemoveFavority'])
const productAmountInCart = ref(props.product.qty_incart)
const isInCart = ref(!!props.product.qty_incart)
const MAXPRODUCT_COUNT = 10000
const isBtnSpinner = ref(false)

const isRemoveBtn = computed(() => {
  return productAmountInCart.value > 0
})

const isAddBtn = computed(() => {
  return productAmountInCart.value < MAXPRODUCT_COUNT
})

async function addCartHandler() {
  isBtnSpinner.value = true

  const prodTmp = profileStore.favorities.find(
    el => el.code === props.product.code
  )

  const res = await cartStore.addToCart(
    props.product.code,
    props.product.salekrat
  )
  if (res instanceof Error || res == undefined) {
    console.log('Error', res)
    // Сделать Message
  } else {
    await cartStore.getShortCart()
    isBtnSpinner.value = false
    productAmountInCart.value += props.product.salekrat
    isInCart.value = true
    prodTmp.qty_incart = productAmountInCart.value
  }
}

const timer = ref(true)

async function changeValueHandler(param, product) {
  if (param === 'add') {
    productAmountInCart.value =
      useToFixedNumber(productAmountInCart.value) + props.product.salekrat
    productAmountInCart.value = useToFixedNumber(productAmountInCart.value)
  } else if (param === 'remove') {
    productAmountInCart.value =
      useToFixedNumber(productAmountInCart.value) - props.product.salekrat
    productAmountInCart.value = useToFixedNumber(productAmountInCart.value)
  }

  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = null
  }

  timer.value = setTimeout(async () => {
    const prodTmp = profileStore.favorities.find(
      el => el.code === props.product.code
    )

    if (productAmountInCart.value > 0) {
      const res = await cartStore.changeCount(
        product,
        productAmountInCart.value
      )

      if (res instanceof Error) {
        console.log('Error', res)
      } else {
        await cartStore.getShortCart()
        prodTmp.qty_incart = productAmountInCart.value
      }
    } else if (productAmountInCart.value == 0) {
      const res = await cartStore.removeFromCart(product)
      if (res instanceof Error) {
        console.log('Error', res)
      } else {
        await cartStore.getShortCart()
        isInCart.value = false
        prodTmp.qty_incart = productAmountInCart.value
      }
    }
  }, 800)
}

async function setNewValue() {
  productAmountInCart.value = setCountProduct(
    productAmountInCart.value,
    MAXPRODUCT_COUNT,
    props.product.salekrat
  )

  if (props.product.qty_incart != productAmountInCart.value) {
    const prodTmp = profileStore.favorities.find(
      el => el.code === props.product.code
    )

    if (productAmountInCart.value > 0) {
      const res = await cartStore.changeCount(
        props.product.code,
        productAmountInCart.value
      )
      if (res instanceof Error) {
        console.log('Error', res)
      } else {
        await cartStore.getShortCart()
        prodTmp.qty_incart = productAmountInCart.value
      }
    } else if (productAmountInCart.value == 0) {
      const res = await cartStore.removeFromCart(props.product.code)
      if (res instanceof Error) {
        console.log('Error', res)
      } else {
        await cartStore.getShortCart()
        isInCart.value = false
        prodTmp.qty_incart = productAmountInCart.value
      }
    }
  }
}

function onRemoveFavority(product) {
  emit('onClickRemoveFavority', product)
}

</script>
