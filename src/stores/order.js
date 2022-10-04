import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => {
    return {
        editOrder: {
            id: 0,
            code: ''
        }
    }
  },
  getters: {

  },
  actions: {
    setEditOrder(order) {
        console.log(order)
        this.editOrder.id = order.id
        this.editOrder.code = order.code
    }
  }
}) 