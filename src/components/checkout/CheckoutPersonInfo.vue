<template>
  <div class="flex flex-col space-y-6">
    <section class="border border-gray-300 rounded-xl p-6">
      <h2>Данные покупателя</h2>
      <div class="flex flex-col divide-y divide-gray-300">
        <div class="py-3 first:pt-0 last:pb-0">
          <div class="text-sm text-gray-500 font-semibold mb-1">
            Имя и контакты
          </div>
          <div>{{profile.name}}</div>
          <div class="flex space-x-2">
            <span>{{profile.phone}}</span>
            <span>{{profile.email}}</span>
          </div>
        </div>
        <div class="py-3 first:pt-0 last:pb-0">
          <div class="text-sm text-gray-500 font-semibold mb-1">Компания</div>
          <div>
            {{profile.subjInfo.name}}
          </div>
        </div>
      </div>
    </section>
    <section class="border border-gray-300 rounded-xl p-6">
      <h2>Способ получения</h2>
      <div class="flex items-stretch space-x-6">
        <div
          class="p-6 border rounded-xl flex flex-col basis-1/2"
          :class="[
            methods === 'self'
              ? 'border-1 border-primary ring-blue-500 ring ring-opacity-20'
              : 'border-gray-300'
          ]"
        >
          <div class="input-group flex cursor-pointer space-x-2 grow">
            <input
              type="radio"
              name="getMethod"
              id="getMethodSelf"
              value="self"
              v-model="methods"
              class="mt-1"
              ref="radioSelf"
            />
            <label class="cursor-pointer" for="getMethodSelf">
              <span class="font-bold text-lg block mb-2">Самовывоз</span>
              <span v-if="profile.city === 'Екатеринбург'" class="block"
                >Сантехкомплект-Урал, Свердловская обл., Екатеринбург, ул. Учителей, 34</span
              >
              <span v-else class="block"
                >Сантехкомплект-Тагил, Свердловская обл., г. Нижний Тагил, ул. Индустриальная, 20</span
              >
            </label>
          </div>
          <div class="text-right mt-2 -mr-3">
            <app-button
              :disabled="methods === 'self'"
              @click="getMethodHandler('self')"
              btnType="link"
              btnSize="md"
              >Выбрать</app-button
            >
          </div>
        </div>
        <div
          class="p-6 border rounded-xl flex flex-col basis-1/2"
          :class="[
            methods === 'delivery'
              ? 'border-1 border-primary ring-blue-500 ring ring-opacity-20'
              : 'border-gray-300'
          ]"
        >
          <div class="input-group cursor-pointer flex space-x-2 grow">
            <input
              type="radio"
              name="getMethod"
              id="getMethodDelivery"
              value="delivery"
              v-model="methods"
              class="mt-1"
              ref="radioDelivery"
            />
            <label class="cursor-pointer" for="getMethodDelivery">
              <span class="font-bold text-lg block mb-2">Доставка</span>
              <span class="block">Добавить адрес доставки</span>
            </label>
          </div>
          <div class="text-right mt-2 -mr-3">
            <app-button
              :disabled="methods === 'delivery'"
              @click="getMethodHandler('delivery')"
              btnType="link"
              btnSize="md"
              >Выбрать</app-button
            >
          </div>
        </div>
      </div>
      <!-- start if delivery -->
      <div v-if="methods === 'delivery'" class="mt-6">
        <h3>Адрес доставки</h3>
        <div class="input-group space-y-2">
          <label for="deliveryCity">Населенный пункт, улица, номер дома</label>
          <app-input
            id="deliveryCity"
            :value="deliveryAddress"
            @input="$emit('update:deliveryAddress', $event.target.value)"
            inputSize="lg"
            placeholder="Введите адрес доставки"
          />
        </div>
      </div>
      <!-- end if delivery -->
    </section>
    <section class="border border-gray-300 rounded-xl p-6">
      <h2>Дополнительно</h2>
      <!-- text area -->
      <div class="input-group space-y-2">
        <label for="orderComment">Комментарий к заказу</label>
        <app-textarea
          id="orderComment"
          :value="comment"
          @input="$emit('update:comment', $event.target.value)"
          rows="4"
          inputSize="lg"
          placeholder="Ваш комментарий"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppButton from '@/components/UI/Buttons/AppButton.vue'
import AppInput from '@/components/UI/Forms/AppInput.vue'
import AppTextarea from '@/components/UI/Forms/AppTextarea.vue'
import { useProfileStore } from '@/stores/profile'

const { profile } = useProfileStore()

const props = defineProps({
  getMethod: {
    type: String
  },
  deliveryAddress: {
    type: String
  },
  comment: {
    type: String
  }
})

const emit = defineEmits([
  'update:getMethod',
  'update:deliveryAddress',
  'update:comment'
])

const methods = computed({
  get() {
    return props.getMethod
  },
  set(value) {
    emit('update:getMethod', value)
  }
})

// refs
const radioSelf = ref(null)
const radioDelivery = ref(null)

function getMethodHandler(method) {
  if (method === 'self') {
    radioSelf.value.focus()
  } else if (method === 'delivery') {
    radioDelivery.value.focus()
  }
  emit('update:getMethod', method)
}
</script>
