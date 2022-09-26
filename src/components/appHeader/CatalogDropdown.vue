<template>
  <div class="header-catalog-dropdown">
    <div class="header-catalog-dropdown__overlay"></div>
    <div class="header-catalog-dropdown__menu">
      <!-- Категория -->
      <div class="menu border-r border-gray-200 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200">
        <div class=" flex justify-between items-baseline">
          <h4 class="font-bold text-lg mb-4 pr-4">Каталог</h4>
          <RouterLink class="mr-4 text-gray-800 text-sm" to="/catalog">Все категории</RouterLink>
        </div>
        
        <div class="menu-list">
          <div
            v-for="item in getFirstLevelCatalog"
            :key="item.id"
            class="menu-list__item"
          >
            <RouterLink
              @mouseenter="handleSelectCategory(item.id, $event)"
              class="menu-list__category-link"
              :to="`/catalog/${item.id}`"
  
            >
              {{ item.name }}
            </RouterLink>
          </div>
        </div>
      </div>
      <!-- # Категория -->
      <!-- Подкатегория -->
      <div v-if="subcategory.length" ref="dropdownSubmenu" class="submenu scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200">
        <h4 class="font-bold text-lg mb-4 pr-4">{{ subcategoryTitle }}</h4>
        <div class="menu-list submenu-list">
          <div
            v-for="subitem in subcategory"
            :key="subitem.id"
            class="menu-list__item"
          >
            <RouterLink :to="`/catalog/${subitem.id}`">{{ subitem.name }}</RouterLink>
          </div>
        </div>
      </div>
      <!-- # Подкатегория -->
    </div>
    <Teleport to="body">
      <div
        @click="handleClick"
        :class="[catalogStore.getIsMenu ? 'show' : '']"
        class="backdrop"
      ></div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import { useCatalogStore } from '@/stores/catalog'

const catalogStore = useCatalogStore()


function handleClick() {
  catalogStore.handleMenu()
}


const subcategory = ref([])
const subcategoryTitle = ref('')
const dropdownSubmenu = ref(null)
const currentCat = ref(null)

const getFirstLevelCatalog = computed(() => {
  return catalogStore.getProductCatalog.filter(el => el.parent_id === 0)
})


  const handleSelectCategory = (id, event) => {
  let links = document.querySelectorAll('.menu-list__category-link')

  currentCat.value = catalogStore.getProductCatalog.find(el => el.id === id)

  subcategory.value = []

  links.forEach(el => el.classList.remove('selected'))
  event.target.classList.add('selected')

  const currentSubCategory = catalogStore.getProductCatalog.filter(
    el => el.parent_id === id
  )

  if (currentSubCategory.length) {
    subcategory.value = currentSubCategory
    subcategoryTitle.value = currentCat.value.name

    if (dropdownSubmenu.value) {
      dropdownSubmenu.value.scrollTop = 0
    }
  } else {
    subcategory.value = []
  }
}





</script>
