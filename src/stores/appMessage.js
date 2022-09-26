import { defineStore } from 'pinia'

export const useAppMessage = defineStore('appMessage', {
  state: () => {
    return {
      isShow: false,
      message: '',
      type: 'info',
      icon: 'info'
    }
  },
  getters: {},
  actions: {
    open(type='info', message, icon='info') {
      this.isShow = true
      this.type = type
      this.message = message
      this.icon = icon
    },

    openWithTimer(type, message, icon) {
      this.open(type, message, icon)
      const timeout = setTimeout(() => {
        this.close()
        clearTimeout(timeout)
      }, 8000)
    },

    close() {
      // deafult state
      this.isShow = false
      this.message = ''
      this.type = 'info'
      this.icon = 'info'
    }
  }
})
