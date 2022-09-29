import { defineStore } from 'pinia'
import { useAppMessage } from './appMessage'
import { useCustomFetch } from '@/utils/fetch'
// const appMessageStore = useAppMessage()

export const useProfileStore = defineStore('profile', {
  state: () => {
    return {
      isLoaded: false,
      profile: null,
      // ordersForMerge: [],
      menu: [
        {
          name: 'Данные профиля',
          alias: 'userinfo',
          onlyAuth: true
        },
        {
          name: 'Мои компании',
          alias: 'company',
          onlyAuth: true
        },
        {
          name: 'История заказов',
          alias: 'orderhistory',
          onlyAuth: true
        },
        {
          name: 'Доставки',
          alias: 'delivery',
          onlyAuth: true
        },
        {
          name: 'Филиал Сантехкомплект-Урал',
          alias: 'office',
          onlyAuth: true
        },
        {
          name: 'Избранные товары',
          alias: 'favorites',
          onlyAuth: false
        },
        {
          name: 'Обратная связь',
          alias: 'feedback',
          onlyAuth: false
        }
      ],
      favorities: []
    }
  },
  getters: {
    getContractByCode: state => {
      return contractCode =>
        state.profile.subjInfo.dogs.find(cntr => cntr.code === contractCode) ||
        ''
    },

    getIsActiveContracts(state) {
      return state.profile.subjInfo.dogs.filter(cntr => cntr.isActual)
    },

    getProfileOffice(state) {
      return state.profile.ownerInfo
    }
  },
  actions: {
    // TODO: func registration

    async loadProfile() {
      try {
        const response = await useCustomFetch('apissz/GetProfile')
        if (response.success) {
          this.profile = response.data
          this.isLoaded = true
        } else {
          throw new Error('При загрузке профиля произошла ошибка')
        }
      } catch (error) {
        console.log(error.message)
      }
    },
    async changePassword(values) {
      try {
        const response = await useCustomFetch(
          `apiauth/ChangePsw/?oldpsw=${values.oldPswRef}&newpsw=${values.newPswRef}`
        )
        if (response.success) {
          return response
        } else {
          throw new Error(response.message || 'При изменении пароля произошла ошибка')
        }
      } catch (error) {
        return error
      }
    },
    async changeProfile(name, phone, email) {
      try {
        const response = await useCustomFetch(
          `apiauth/ChangeProfile/?name=${name}&phone=${phone}&email=${email}`
        )
        return response
      } catch (error) {
        return error
      }
    },

    async getFavorities() {
      try {
        const response = await useCustomFetch('apissz/GetFavorities')

        if (response.success) {
          // console.log('ИЗБРАННЫЕ', response.data)
          this.favorities = response.data
        }
      } catch (error) {
        console.log(error)
      }
    },

    async addToFavorities(product) {
      const appMessageStore = useAppMessage()
      try {
        const response = await useCustomFetch(
          `apissz/FavorityAdd/?gcode=${product}`
        )

        if (response.success) {
          appMessageStore.openWithTimer(
            'info',
            'Товар добавлен в избранное',
            'info'
          )
        } else {
          appMessageStore.openWithTimer(
            'error',
            'При добавлении товара в избранное произошла ошибка',
            'error'
          )
        }
      } catch (error) {
        appMessageStore.openWithTimer(
          'error',
          'При добавлении товара в избранное произошла ошибка',
          'error'
        )
        console.log(error.message)
      }
    },
    async removeFromFavorities(product) {
      const appMessageStore = useAppMessage()
      try {
        const response = await useCustomFetch(
          `apissz/FavorityRemove/?gcode=${product}`
        )

        if (response.success) {
          appMessageStore.openWithTimer(
            'info',
            'Товар удален из избранных',
            'info'
          )
        } else {
          appMessageStore.openWithTimer(
            'error',
            'При удалении товара из избранных произошла ошибка',
            'error'
          )
        }
      } catch (error) {
        appMessageStore.openWithTimer(
          'error',
          'При удалении товара из избранных произошла ошибка',
          'error'
        )
        console.log(error.message)
      }
    }
  }
})
