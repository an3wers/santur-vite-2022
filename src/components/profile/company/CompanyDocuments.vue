<template>
  <div class="border border-gray-300 rounded-xl p-6">
    <div class="text-2xl font-bold mb-5">Документы</div>

    <div class="divide-y divide-gray-300">
      <div class="py-4 first:pt-0 last:pb-0">
        <div class="text-lg font-bold mb-3">Закрывающие документы</div>

        <form @submit.prevent="documentRequestHandler" class="space-y-4">
          <!-- switch -->
          <button-group-wrapper @onClickBtnGroup="btnGroupHandler">
            <button-group :title="`${documentRequestMethods[0]['title']}`">
              <div class="input-group w-96 space-y-2">
                <label for="documentRange">Выбрать период</label>
                <div class="flex space-x-2 items-center">
                  <app-input
                    type="date"
                    v-model="documents.rangeStart"
                    name="documentRangeStart"
                  />
                  <span>—</span>
                  <app-input
                    type="date"
                    v-model="documents.rangeEnd"
                    name="documentRangeEnd"
                  />
                </div>
              </div>
            </button-group>
            <button-group :title="`${documentRequestMethods[1]['title']}`">
              <div class="input-group w-96 space-y-2">
                <label>Номер заказа или счета</label>
                <app-input
                  type="text"
                  v-model="documents.number"
                  name="documentNumber"
                />
                <div class="text-sm text-gray-500">
                  Можно ввести несколько через запятую
                </div>
              </div>
            </button-group>
          </button-group-wrapper>
          <AppButton :disabled="!isDocumentHandler" type="submit"
            >Получить документы</AppButton
          >
        </form>
      </div>
      <div class="py-4 first:pt-0 last:pb-0">
        <div class="text-lg font-bold mb-3">Акт сверки</div>
        <form @submit.prevent="actsRequestHandler" class="space-y-4">
          <div class="input-group w-96 space-y-2">
            <label for="ActRange">Выбрать период</label>
            <div class="flex space-x-2 items-center">
              <app-input
                type="date"
                v-model="acts.rangeStart"
                name="ActRangeStart"
              />
              <span>—</span>
              <app-input
                type="date"
                v-model="acts.rangeEnd"
                name="ActRangeEnd"
              />
            </div>
          </div>
          <AppButton :disabled="!isActsHandler" type="submit"
            >Получить акт сверки</AppButton
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppButton from '@/components/UI/Buttons/AppButton.vue'
import AppInput from '@/components/UI/Forms/AppInput.vue'
import buttonGroupWrapper from '@/components/UI/buttonGroup/buttonGroupWrapper.vue'
import buttonGroup from '@/components/UI/buttonGroup/buttonGroup.vue'
import { ref, reactive, computed } from 'vue'

const documentRequestMethods = ref([
  { title: 'За период', isSelectet: true },
  { title: 'По номеру заказа или счета', isSelectet: false }
])

function btnGroupHandler(value) {
  documentRequestMethods.value.forEach(el => {
    el.isSelectet = false
  })

  documentRequestMethods.value.find(el => el.title === value).isSelectet = true
}

const documents = reactive({
  rangeStart: '',
  rangeEnd: '',
  number: ''
})

const acts = reactive({
  rangeStart: '',
  rangeEnd: ''
})

const isDocumentHandler = computed(() => {
  if (documentRequestMethods.value[0].isSelectet) {
    return documents.rangeStart && documents.rangeEnd
  } else {
    return documents.number
  }
})

const isActsHandler = computed(() => {
  return acts.rangeStart && acts.rangeEnd
})

function documentRequestHandler() {
  if (documentRequestMethods.value[0].isSelectet) {
    // console.log('За период', documents.rangeStart, documents.rangeEnd)
    documents.rangeStart = ''
    documents.rangeEnd = ''
  } else {
    // console.log('По номеру заказа или счета', documents.number)
    documents.number = ''
  }
}

function actsRequestHandler() {
  // console.log('Акт сверки', acts.rangeStart, acts.rangeEnd)
  acts.rangeStart = ''
  acts.rangeEnd = ''
}
</script>
