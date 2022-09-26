import { defineStore } from 'pinia'
import { useCustomFetch } from '@/utils/fetch'

// const { useCustomFetch } = useCustomFetch()

export const useCatalogStore = defineStore('catalog', {
  state: () => {
    return {
      productCatalog: [],
      isMenu: false,
      products: [],
      // isSetGoods: false,
      displaySelectedFilterBtn: false,
    }
  },
  getters: {
    getProductCatalog(state) {
      return state.productCatalog
    },

    getIsMenu(state) {
      return state.isMenu
    }
  },
  actions: {
    async loadCatalog() {
      try {
        const response = await useCustomFetch('apissz/getcatalog')
        if (response.success) {
          this.productCatalog = response.data
        }
      } catch (error) {
        console.log(error)
      }
    },

    // Open or Close dropdown menu
    handleMenu() {
      this.isMenu = !this.isMenu

      if (this.isMenu) {
        document.body.classList.add('catalog-open')
      } else {
        document.body.classList.remove('catalog-open')
      }
    },
    
    // TODO: Можно вынести в компонент
    setDisplaySelectedFilterBtn() {
      this.displaySelectedFilterBtn = true

      setTimeout(() => {
        this.displaySelectedFilterBtn = false
      }, 8000)
    },

    handleDisplaySelectedFilterBtn() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      this.displaySelectedFilterBtn = false
    }
  }
})
