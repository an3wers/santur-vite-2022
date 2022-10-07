import { defineStore } from "pinia";
import { useCustomFetch } from "@/utils/fetch";
import { useMainStore } from "./main";
// import { useRoute } from "vue-router";

export const useCategoryStore = defineStore("category", {
  state: () => {
    return {
      categoryProducts: [],
      categoryFilters: [],
      pageCount: "",
      productCount: "",
      setedFilters: [],
      setedFiltersPrice: [],
      orderBy: null,
      inCash: false,
      isTn: false,
    };
  },
  getters: {
    getCategoryFilters(state) {
      return state.categoryFilters;
    },

    getFilterCheckbox(state) {
      return state.categoryFilters.filter((el) => el.IsNumeric === false);
    },
  },
  actions: {
    async setCategory(params) {
      const mainStore = useMainStore();
      try {
        const response = await useCustomFetch(`apissz/setgoodsearch/${params}`);
        // TODO throw
        if (response.success) {
          // return response
          return response;
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        mainStore.pageError = true;
        // console.log(error);
      }
    },

    async loadProducts(page) {
      const mainStore = useMainStore();
      try {
        const response = await useCustomFetch(
          `apissz/getGoodList/?page=${page}`
        );
        if (response.success) {
          this.categoryProducts = response.data.ListGoods;
          this.pageCount = response.data.qty_pages;
          this.productCount = response.data.qty_records;
          this.orderBy = response.data.order_by;
          this.inCash = response.data.incash;
        } else {
          // TODO Check error.message
          throw new Error(response.message || 'При загрузке товаров произошла ошибка');
        }
      } catch (error) {
        // Вывожу экран с ошибкой
        mainStore.pageError = true;
        console.log(error.message);
      }
    },

    async setFilter(params) {
      try {
        const response = await useCustomFetch(
          `apissz/SetFilterToggle/${params}`
        );

        if (response.success) {
          this.categoryFilters = this.addIsCheckedToFilters(
            response.data.filters
          );

          this.updateSetedFilters(response.data.filters);
        }
      } catch (error) {
        console.log(error);
      }
    },

    // Функция не используется
    async removeFilter(params) {
      try {
        const response = await useCustomFetch(`apissz/ClearFilter/${params}`);

        if (response.success) {
          this.categoryFilters = this.addIsCheckedToFilters(
            response.data.filters
          );
          this.updateSetedFilters(response.data.filters);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async removeLimit(filter, type) {
      try {
        const response = await useCustomFetch(
          `apissz/clearfilter${type}/?flt=${filter}`
        );
        // console.log(response)
        if (response.success) {
          this.updateSetedFilters(response.data.filters);
          this.updateSetedFilterPrice(response.data.filters);
        }
      } catch (error) {
        console.log(error);
      }
    },

    // Функция не используется
    async loadFilters() {
      try {
        const response = await useCustomFetch("apissz/GetGoodFilters");

        if (response.success) {
          this.categoryFilters = this.addIsCheckedToFilters(response.data);
          this.updateSetedFilters(response.data);
          // await this.loadProducts(this.page)
        }
      } catch (error) {
        console.log(error);
      }
    },

    async setFilters(route) {
      // const route = useRoute();

      // Из роута беру фильтры чекбоксы
      const arrFilter = Object.entries(route.query)
        .filter(
          (el) =>
            el[0] !== "page" &&
            el[0] !== "price" &&
            el[0] !== "incash" &&
            el[0] !== "search"
        )
        .map((el) => el.join("="));
      const strFilters = arrFilter.join("&");

      try {
        const response = await useCustomFetch(
          `apissz/setFilters/?tk_id=${route.params.id}&${strFilters}`
        );
        if (response.success) {
          this.categoryFilters = this.addIsCheckedToFilters(
            response.data.filters
          );
          this.updateSetedFilters(response.data.filters);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async cleanAllFilter() {
      try {
        const response = await useCustomFetch(`apissz/ClearFilter/?flt=all`);
        if (response.success) {
          this.categoryFilters = this.addIsCheckedToFilters(
            response.data.filters
          );
          this.updateSetedFilters(response.data.filters);
          this.updateSetedFilterPrice(response.data.filters);
          // загружаю продукты
          // await this.loadProducts(this.page)
        }
      } catch (error) {
        console.log(error);
      }
    },

    async setMaxLimit(payload) {
      try {
        const response = await useCustomFetch(`apissz/SetFilterMax/${payload}`);

        if (response.success) {
          this.categoryFilters = this.addIsCheckedToFilters(
            response.data.filters
          );
          this.updateSetedFilterPrice(response.data.filters);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async setMinLimit(payload) {
      try {
        const response = await useCustomFetch(`apissz/SetFilterMin/${payload}`);

        if (response.success) {
          this.categoryFilters = this.addIsCheckedToFilters(
            response.data.filters
          );
          this.updateSetedFilterPrice(response.data.filters);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async setSort(value) {
      const mainStore = useMainStore();
      try {
        const response = await useCustomFetch(
          `apissz/setorderby/?orderby=${value}`
        );
      } catch (error) {
        mainStore.pageError = true;
        console.log(error);
      }
    },

    async setInCash(value) {
      const mainStore = useMainStore();
      try {
        const response = await useCustomFetch(
          `apissz/SetIncash/?incash=${value}`
        );

        // Обработать фильтры
        if (response.success) {
          this.categoryFilters = this.addIsCheckedToFilters(
            response.data.filters
          );
          this.updateSetedFilterPrice(response.data.filters);
        }
      } catch (error) {
        mainStore.pageError = true;
        console.log(error);
      }
    },

    // utils for filters
    addIsCheckedToFilters(filters) {
      return filters.map((el) => {
        if (el.IsNumeric) {
          return el;
        }
        const arrSelected = el.Selected.split(";");

        for (let i of el.Items) {
          i.isChecked = arrSelected.includes(i.Name);
        }
        return el;
      });
    },

    updateSetedFilters(array) {
      let tmp = [];
      const selectedFilters = array.filter((el) => el.Selected !== "");

      if (selectedFilters.length) {
        selectedFilters.forEach((el) => {
          tmp.push(`${el.Name}=${el.Selected}`);
        });
      }

      this.setedFilters = tmp;
    },

    updateSetedFilterPrice(array) {
      let tmp = [];
      // console.log(array)
      const objPrice = array.find((el) => el.Name === "Цена");

      if (objPrice.MinSelect.length) {
        tmp.push(`minprice:${objPrice.MinSelect}`);
      }
      if (objPrice.MaxSelect.length) {
        tmp.push(`maxprice:${objPrice.MaxSelect}`);
      }

      this.setedFiltersPrice = tmp;
    },
  },
});
