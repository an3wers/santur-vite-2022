<template>
  <div class="border border-gray-300 rounded-xl p-6">
    <div class="text-2xl font-bold mb-5">
      {{ profileStore.profile.subjInfo.name }}
    </div>

    <div class="divide-y divide-gray-300">
      <div class="py-3 first:pt-0 last:pb-0">
        <div class="text-sm text-gray-500 font-semibold mb-1">ИНН</div>
        <div>{{ profileStore.profile.subjInfo.inn }}</div>
      </div>

      <div class="py-3 first:pt-0 last:pb-0">
        <div class="text-sm text-gray-500 font-semibold mb-1">Договор</div>
        <!-- TODO: Селектор выбора договора -->
        <div class="inline-flex items-baseline mb-2">
          <label class="w-32" for="selectContract">Номер</label>
          <select
            v-model="selectedContarct"
            aria-label="selectContract"
            class="w-48 rounded-md border form-select bg-slate-150 hover:bg-slate-200 border-transparent focus:border-primary focus:bg-white focus:ring focus:ring-blue-500 focus:ring-opacity-20 py-2 text-base px-3 leading-5"
            v-if="profileStore.getIsActiveContracts.length"
          >
            <option
              v-for="option in profileStore.getIsActiveContracts"
              :key="option.code"
              :value="option.code"
            >
              {{ option.num }}
            </option>
          </select>
          <span v-else>{{profileStore.getContractByCode(selectedContarct).num}}</span>
        </div>

        <ul class="space-y-2">
          <!-- <li>Номер: {{ profileStore.getContractByCode(selectedContarct).num }}</li> -->
          <li class="flex items-baseline">
            <span class="w-32">Код:</span>
            <span>{{
              profileStore.getContractByCode(selectedContarct).code
            }}</span>
          </li>
          <li class="flex items-baseline">
            <span class="w-32">Дата окончания:</span>
            <span>{{
              profileStore.getContractByCode(selectedContarct).endDate
            }}</span>
          </li>
        </ul>
      </div>

      <div class="py-3 first:pt-0 last:pb-0">
        <div class="text-sm text-gray-500 font-semibold mb-1">
          Условия договора
        </div>
        <ul class="space-y-2">
          <li class="flex items-baseline">
            <span class="w-32">Лимит:</span>
            <span>{{
              useCurrency(
                profileStore.getContractByCode(selectedContarct).limitDZ
              )
            }}</span>
          </li>
          <li class="flex items-baseline">
            <span class="w-32">Отсрочка:</span>
            <span
              >{{ profileStore.getContractByCode(selectedContarct).payOtsrok }}
              {{
                useNounEnding(
                  profileStore?.getContractByCode(selectedContarct)?.payOtsrok,
                  'день',
                  'дня',
                  'дней'
                )
              }}
            </span>
          </li>
          <!-- <li>Тип цены:</li> -->
        </ul>
      </div>

      <div class="py-3 first:pt-0 last:pb-0">
        <div class="text-sm text-gray-500 font-semibold mb-1">
          Денежный баланс
        </div>
        <span
          v-if="profileStore.getContractByCode(selectedContarct).currentDZ > 0"
          class="text-red-500"
          >-
          {{
            useCurrency(
              profileStore?.getContractByCode(selectedContarct)?.currentDZ
            )
          }}</span
        >
        <span v-else>{{
          useCurrency(
            profileStore?.getContractByCode(selectedContarct)?.currentDZ
          )
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProfileStore } from '@/stores/profile'
// import AppSelector from '@/components/UI/Forms/AppSelector.vue'
import { useCurrency, useNounEnding } from '@/utils/helpers'
const profileStore = useProfileStore()

const selectedContarct = ref(profileStore.profile.subjInfo.dgcode || '')


</script>
