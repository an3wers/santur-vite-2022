import { defineStore } from "pinia";
import { useCustomFetch } from "@/utils/fetch";
import { useAppMessage } from "./appMessage";

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      cartId: null,
      cartItems: [],
      cartCount: 0,
      cartSum: "0,00",
      cartState: "не сохранена",
      cartWeight: "",
      cartSumRaw: 0,
      cartIsUpdated: true,
    };
  },
  getters: {},
  actions: {
    async addToCart(porduct, count) {
      const appMessageStore = useAppMessage();
      try {
        const response = await useCustomFetch(
          `apissz/AddToCart/?gcode=${porduct}&qty=${count}`
        );
        if (response.success) {
          return response.data;
        } else {
          throw new Error("При добавлении в корзину произошла ошибка");
          // return undefined
        }
      } catch (error) {
        appMessageStore.openWithTimer("error", error.message, "error");
        return error;
      }
    },
    async removeFromCart(porduct) {
      const appMessageStore = useAppMessage();
      try {
        const response = await useCustomFetch(
          `apissz/RemoveCartItem/?gcode=${porduct}`
        );
        if (response.success) {
          // console.log("Товар удален ", response.data);
          return response.data;
        } else {
          throw new Error(response.message || 'При удалении товара из корзины произошла ошибка')
        }
      } catch (error) {
        appMessageStore.openWithTimer(
          "error",
          error.message,
          "error"
        );
        return error;
      }
    },

    async cleanCart() {
      const appMessageStore = useAppMessage();
      try {
        const response = await useCustomFetch("apissz/ClearCart");
        if (response.success) {
          return response.data;
        } else {
          throw new Error('При очищении корзины произошла ошибка')
        }
      } catch (error) {
        appMessageStore.openWithTimer(
          "error",
          "При очищении корзины произошла ошибка",
          "error"
        );

        return error;
      }
    },

    async getCart() {
      try {
        const response = await useCustomFetch("apissz/GetCart");
        if (response.success) {
          // console.log('getCart', response.data)
          this.cartId = response.data.id;
          this.cartCount = response.data.qtyitems;
          this.cartSum = response.data.summs;
          this.cartSumRaw = response.data.summ;
          this.cartItems = response.data.items;
          this.cartWeight = response.data.weight;
          // console.log('Корзина', response.data)
          return response.data;
        } else {
          throw new Error("Error cart");
        }
      } catch (error) {
        return error;
      }
    },
    async getShortCart() {
      try {
        const response = await useCustomFetch("apissz/GetCartShortInfo");
        if (response.success) {
          // console.log('getShortCart', response.data)
          // this.cart = response.data
          this.cartCount = response.data.qtyitems;
          this.cartSum = response.data.summs;
          this.cartSumRaw = response.data.summ;
          this.cartState = response.data.state;
          // console.log('Получение маленькой корзины: ', response.data)
        } else {
          throw new Error("Error cart");
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    async changeCount(product, count) {
      const appMessageStore = useAppMessage();
      // ChangeCartItem/?gcode=...&qty=...

      try {
        const response = await useCustomFetch(
          `apissz/ChangeCartItem/?gcode=${product}&qty=${count}`
        );

        if (response.success) {
          return response.data;
        } else {
          throw new Error(response.message || "При изменении количества произошла ошибка");
        }
      } catch (error) {
        appMessageStore.openWithTimer(
          "error",
          error.message,
          "error"
        );
        return error;
      }
    },
    async changeContractInCart(code) {
      try {
        const response = await useCustomFetch(
          `apissz/SelectDg/?dgCode=${code}`
        );
        console.log(response.data); // ok
      } catch (error) {
        console.log(error);
      }
    },
    async cartConfirm(payMethod = "бн", comment, address) {
      try {
        // CartToOrd/?pay=бн&cmnt=...&address=...
        // const response = await useCustomFetch(`apissz/CartToOrd/?pay=бн&cmnt=...&address=...`)
        const response = await fetch(
          `https://isantur.ru/apissz/CartToOrd/?pay=${payMethod}&cmnt=${comment}&address=${address}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.success) {
          console.log("Confirm order", data);
          return data.data;
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        return error;
      }
    },
  },
});
