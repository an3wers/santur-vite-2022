import { defineStore } from 'pinia'
import { useCartStore } from './cart'
import { useProfileStore } from './profile'
import { useAppMessage } from './appMessage'
import { useCustomFetch } from '@/utils/fetch'
// import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: {
        id: null,
        name: '',
        email: '',
        phone: ''
      },
      modalAuthIsOpen: false,
      sessionCookie: '',
      userCookie: '' //localStorage.getItem('usrcookie') || '',
    }
  },
  getters: {
    getIsOpenAuthModal(state) {
      return state.modalAuthIsOpen
    },
    getUser(state) {
      return state.user
    },
    getUserNameForHeader(state) {
      return state.user.id ? state.user.name : 'Войдите'
    },
    getIsAuth(state) {
      return !!state.user.id
    }
  },
  actions: {
    openAuthModal() {
      this.modalAuthIsOpen = true
      // document.body.classList.add('modal-open')
    },
    closeAuthModal() {
      this.modalAuthIsOpen = false
      document.body.classList.remove('modal-open')
    },

    async setUser() {
      try {
        const response = await useCustomFetch('apiauth/getiam')
        if (response.success) {
          this.user.id = response.data.id
          this.user.email = response.data.email
          this.user.name = response.data.name
          this.user.phone = response.data.phone
          this.sessionCookie = response.data.sid
        }
      } catch (error) {
        console.log(error)
      }
    },

    async login(user) {
      
      const cartStore = useCartStore()
      const profileStore = useProfileStore()
      const appMessageStore = useAppMessage()

      try {
        const response = await useCustomFetch(
          `apiauth/login/?login=${user.emailU}&psw=${user.pswU}`
        )
        // TODO: обработать ошибки: неверный пароль, неверный логин
        if (response.success) {
          await this.setUser()
          await cartStore.getCart()
          await profileStore.loadProfile()
          await profileStore.getFavorities()
          appMessageStore.openWithTimer(
            'success',
            'Вы успешно авторизовались',
            'success'
            )
            this.closeAuthModal()
            return response
        } else {
          throw new Error(response.message || 'При авторизации произошла ошибка') // обработка ощибки
        }
    
      } catch (error) {
        appMessageStore.open('error', error.message, 'error')
        return error
      }
    },

    async logout() {
      const cartStore = useCartStore()
      const profileStore = useProfileStore()
      const appMessageStore = useAppMessage()
      // ??
      // const router = useRouter()

      try {
        const response = await useCustomFetch('apiauth/logout')
        if (response.success) {
          return response.data

          // if(path.includes('profile') || path.includes('checkout')) {
            
          //   // navigateTo('/')
          //   router.push('/')
          
          // }

          // await this.setUser()
          // await cartStore.getCart()
          // await profileStore.loadProfile()
          // await profileStore.getFavorities()
          // appMessageStore.openWithTimer('info', 'Вы вышли из профиля', 'info')
        
        } else {
          throw new Error('При выходе из профиля произошла ошибка')
        }
      } catch (error) {
        return error
        // appMessageStore.open('error', error.message, 'error')
      }
    }
  }
})
