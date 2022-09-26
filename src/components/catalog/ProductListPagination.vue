<template>
  <div class="flex justify-between py-6 border-t">
    <div class="flex space-x-2 flex-wrap">
      <!-- disabled="true" -->
      <!-- <app-button
      v-if="current !== 1"
      btnType="secondary"
      btnSize="md"
      @click="onChange(current - 1)"
      >Пред.</app-button
    > -->
      <div class="inline-flex items-center" v-if="current >= 5">
        <button
          @click="onChange(startItem.p)"
          class="py-2 font-medium px-3 leading-5 rounded-md border border-transparent text-primary bg-transparent"
        >
          {{ startItem.p }}
        </button>
        <span class="font-medium text-primary">…</span>
      </div>
      <button
        :class="[
          p.isActive
            ? 'bg-primary hover:bg-primary-hover text-white'
            : 'text-primary bg-transparent'
        ]"
        class="py-2 text-base px-3 font-medium leading-5 rounded-md border border-transparent"
        @click="onChange(p.p)"
        v-for="(p, index) in pagesArr"
        :key="index"
      >
        {{ p.p }}
      </button>
      <div
        class="inline-flex items-center"
        v-if="categoryStore.pageCount > step * 2 && categoryStore.pageCount - current > 3"
      >
        <span class="font-medium text-primary">…</span>
        <button
          @click="onChange(endItem.p)"
          class="py-2 text-base px-3 leading-5 font-medium rounded-md border border-transparent text-primary bg-transparent"
        >
          {{ endItem.p }}
        </button>
      </div>

      <!--<app-button
      v-if="current !== pageCount"
      btnType="secondary"
      btnSize="md"
      @click="onChange(current + 1)"
      >След.</app-button 
    >-->
    </div>
    <div class="inline-flex space-x-2">
      <app-input
        class="w-44"
        v-model="pageValue"
        type="number"
        placeholder="Номер страницы"
        inputType="border"
      />
      <app-button :disabled="setPageViladate" @click="onChange(Number(pageValue))" btnType="secondary">Перейти</app-button>
    </div>
  </div>
</template>

<script setup>
import AppButton from '@/components/UI/Buttons/AppButton.vue'
import AppInput from '@/components/UI/Forms/AppInput.vue'
import { ref, computed, watch } from 'vue'

import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()

const props = defineProps({
  // pageCount: {
  //   type: Number
  // },
  current: {
    type: Number
  }
})

const pageValue = ref('')
const pageStart = 1
const step = 3

// const pagesArrFull = ref([])

// for (let i = pageStart; i <= categoryStore.pageCount; i++) {
//   if (i === props.current) {
//     pagesArrFull.value.push({ p: i, isActive: true })
//   } else {
//     pagesArrFull.value.push({ p: i, isActive: false })
//   }
// }

const getPagesArrFull = computed(() => {
  const arr = []

  for (let i = pageStart; i <= categoryStore.pageCount; i++) {
    if (i === props.current) {
    arr.push({ p: i, isActive: true })
  } else {
    arr.push({ p: i, isActive: false })
  }
  }

  return arr

})

const endItem = computed(() => {
  const arr = getPagesArrFull.value.slice()
  return arr.pop()
})

const startItem = computed(() => {
  const arr = getPagesArrFull.value.slice()
  return arr.shift()
})

const pagesArr = computed(() => {
  if (props.current - step < 0 || props.current - step === 0) {
    return getPagesArrFull.value.slice(0, step * 2)
  } else {
    return getPagesArrFull.value.slice(
      props.current - 1 - step,
      props.current + step
    )
  }
})

const emit = defineEmits(['change'])

function onChange(p) {
  getPagesArrFull.value.forEach(el => {
    if (el.p === p) {
      el.isActive = true
    } else {
      el.isActive = false
    }
  })
  pageValue.value = ''
  emit('change', p)
}

const setPageViladate = computed(() => {
  return pageValue.value.length > 0 && pageValue.value <= categoryStore.pageCount ? false : true
})


</script>
