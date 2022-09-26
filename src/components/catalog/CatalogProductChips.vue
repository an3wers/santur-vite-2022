<template>
  <div class="mb-6 flex flex-wrap">
    <div
      v-for="chip in getSelectedFilters"
      :key="chip.value"
      @click="onClick(chip)"
      class="mr-4 mb-2 last:mr-0"
    >
      <!-- <Popper hover arrow :content="`${chip.name}`"> -->
      <Popper hover arrow :content="chip.name === 'price' ? 'Цена' : chip.name">
        <div
          class="inline-flex py-2 px-2 bg-primary hover:bg-primary-hover space-x-1 rounded-md cursor-pointer"
        >
          <span class="text-sm text-white">{{ chip.value }}</span>
          <close-icon-20 color="#ffffff" />
        </div>
      </Popper>
    </div>
  </div>
</template>

<script setup>
import CloseIcon20 from "@/components/UI/Icons/CloseIcon_20.vue";
import { computed } from "vue";
import { useCategoryStore } from "@/stores/category";
import Popper from "vue3-popper";

const categoryStore = useCategoryStore();

// const { filters } = defineProps({
//   filters: {
//     type: Array,
//     default: []
//   }
// })

const emit = defineEmits(["cleanFilter"]);

// [ { "name": "Бренд", "value": "HAWLE" }, { "name": "Бренд", "value": "Mupro" } ]

// Вариант работы когда в пропс передаю всю структуру фильтров
const getSelectedFilters = computed(() => {
  const selected = categoryStore.categoryFilters.filter(
    (el) => el.Selected.length
  );

  const selectedPrice = categoryStore.setedFiltersPrice;

  const res = [];
  const tmpPrice = [];

  selected.forEach((el) => {
    el.Selected.split(";").forEach((filter) => {
      res.push({ name: el.Name, value: filter });
    });
  });

  if (selectedPrice.length) {
    selectedPrice.forEach((el) => {
      const elArr = el.split(":");

      if (elArr[0] == "maxprice") {
        res.push({ name: "price", value: `до ${elArr[1]} ₽`, type: "max" });
      }

      if (elArr[0] == "minprice") {
        res.push({ name: "price", value: `от ${elArr[1]} ₽`, type: "min" });
      }
    });
  }

  return res;
});

// const getSelectedFilters = computed(() => {
//   // ['']
//     // [ "Бренд=HL;Аквапромлит", "Ду=Ду110" ]
//     // [ { "name": "Бренд", "value": "HAWLE" }, { "name": "Бренд", "value": "Mupro" } ]
//     // [ [ "Бренд", "Tecofi;CMO" ], [ "Ду", "Ду150" ] ]

//     // [0] [1] массив, либо строчка

//     let res = []
//     let fltr = {}

//     categoryStore.setedFilters.forEach((el, index, arr) => {
//       el.split('=').forEach(el => {
//         el[1].split(';')
//       })
//     })

//     return res
// })

function onClick(chip) {
  emit("cleanFilter", chip);
}
</script>
