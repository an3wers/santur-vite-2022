<template>
  <div class="text-center py-24">
    <p class="font-semibold text-lg">В вашей корзине пусто</p>
    <p>Перейдите в каталог, чтобы найти необходимые товары.</p>
    <RouterLink
      to="/catalog"
      class="mt-4 inline-flex no-underline items-center text-center justify-center rounded-md disabled:opacity-75 bg-primary border border-transparent hover:bg-primary-hover focus:outline-none focus:ring-blue-200 focus:ring focus:ring-opacity-50 text-white hover:text-white py-2 text-base px-3 leading-5"
      >К товарам</RouterLink
    >
  </div>
</template>

<script setup></script>
