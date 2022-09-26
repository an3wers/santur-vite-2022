<template>
  <div class="flex justify-between items-center mb-6">
    <div class="w-60">
      <!-- Селектор -->
      <app-selector
        inputType="border"
        @onChange="handleChangeSelect"
        :selected="orderBy"
        :options="options"
      />
    </div>
    <div>
      <!-- Чекбокс -->

      <!-- TODO: Вынести свитч в компонент -->
      <label class="relative cursor-pointer inline-flex items-center">
        <input
          type="checkbox"
          name="Товары в наличии"
          @change="handleChangeCheckbox($event)"
          v-model="inCash"
          class="sr-only peer"
        />
        <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-0 peer-focus:ring-offset-0 peer-focus:ring-opacity-50 peer-focus:ring-blue-200 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        <span class="ml-2 -mt-1">Товары в наличии</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import AppSelector from '@/components/UI/Forms/AppSelector.vue'
import AppCheckbox from '@/components/UI/Forms/AppCheckbox.vue'
import { ref, computed } from 'vue'

import { useCategoryStore } from '@/stores/category'
const categoryStore = useCategoryStore()

// const props = defineProps({
//     orderby: {
//         type: String
//     },
//     incash: {
//         type: Boolean
//     }
// })

// let selected = ref(props.orderby)

const orderBy = ref(categoryStore.orderBy)
const inCash = ref(categoryStore.inCash)

// const getOrderBy = computed(() => {
//     return categoryStore.orderBy || 'relev'
// })

// const getInCash = computed(() => {
//     return categoryStore.inCash
// })

const emit = defineEmits(['changeSort', 'changeInCash'])

const options = ref([
  { text: 'По популярности', value: 'relev' },
  { text: 'По наименованию', value: 'name' },
  { text: 'Цена по ворзрастанию', value: 'price' },
  { text: 'Цена по убыванию', value: 'price desc' }
])

// Товары в наличии
function handleChangeCheckbox(event) {
  //   console.log('Чекабокс', event.target.checked)
  emit('changeInCash', event.target.checked)
}

// Сортировка
function handleChangeSelect(value) {
  // console.log('Селектор', value)
  emit('changeSort', value)
}

// function testHandleChangeCheckbox(event) {
//   console.log('Тест', event.target.checked)
// }
</script>
