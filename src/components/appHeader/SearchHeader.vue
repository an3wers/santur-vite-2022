<template> 
  <form class=" relative">
    <input class="pl-4 pr-10 py-2.5 text-lg w-full rounded-md border form-input bg-transparent border-gray-300 focus:border-primary focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100 disabled:text-gray-500" type="text" placeholder="Найти товары">
    <!-- <button class="absolute search-icon"><search-icon-24 color="#1976D2" /></button> -->
    <app-button-icon class="absolute search-icon"><search-icon-24 color="#ffffff" /></app-button-icon>
  </form>
</template>

<script>
import SearchIcon24 from '@/components/UI/Icons/SearchIcon_24.vue'
import AppButtonIcon from '@/components/UI/Buttons/AppButtonIcon.vue'
export default {
  components: {
    SearchIcon24,
    AppButtonIcon
  },
  setup() {}
}
</script>
