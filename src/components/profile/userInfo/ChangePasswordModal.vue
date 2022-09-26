<template>
  <div>
    <form @submit="onChengePassword" class="space-y-4">
      <div class="input-group space-y-2">
        <label for="oldPassword">Старый пароль</label>
        <app-input
          type="password"
          v-model.trim="oldPswRef"
          id="oldPassword"
          inputSize="md"
          autocomplete="on"
          :inputType="
            oldPswError && oldPswRefMeta.touched ? 'solid-error' : 'solid'
          "
          @blur="oldPswBlur"
        />
        <div
          v-if="oldPswError && oldPswRefMeta.touched"
          class="text-sm text-red-500"
        >
          {{ oldPswError }}
        </div>
      </div>
      <div class="input-group space-y-2">
        <label for="newPassword">Новый пароль</label>
        <app-input
          type="password"
          v-model.trim="newPswRef"
          id="newPassword"
          inputSize="md"
          autocomplete="on"
          :inputType="
            newPswError && newPswRefMeta.touched ? 'solid-error' : 'solid'
          "
          @blur="newPswBlur"
        />
        <div
          v-if="newPswError && newPswRefMeta.touched"
          class="text-sm text-red-500"
        >
          {{ newPswError }}
        </div>
        <div
          v-else-if="newPswRef === oldPswRef && oldPswRef"
          class="text-sm text-red-500"
        >
          Пароли не должны совпадать
        </div>
        <div v-else class="text-sm text-gray-500">
          Используйте 6+ символов для более безопасного пароля.
        </div>
      </div>
      <app-button type="submit" :disabled="!getChangeBtnIsActive"
        >Изменить пароль</app-button
      >
    </form>
  </div>
</template>

<script setup>
import AppInput from '@/components/UI/Forms/AppInput.vue'
import AppButton from '@/components/UI/Buttons/AppButton.vue'
import { ref, computed, toRef } from 'vue'

import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

const emit = defineEmits(['changePassword'])

const MIN_LENGTH_PSW = 6
const { handleSubmit } = useForm()

const {
  value: oldPswRef,
  errorMessage: oldPswError,
  handleBlur: oldPswBlur,
  meta: oldPswRefMeta
} = useField('oldPswRef', yup.string().required('Введите старый пароль').trim())

const {
  value: newPswRef,
  errorMessage: newPswError,
  handleBlur: newPswBlur,
  meta: newPswRefMeta
} = useField(
  'newPswRef',
  yup
    .string()
    .required('Введите новый пароль')
    .min(MIN_LENGTH_PSW, `Минимальная длина пароля ${MIN_LENGTH_PSW} символов`)
    .trim()
)

const getChangeBtnIsActive = computed(() => {
  if (
    oldPswRef.value !== '' &&
    newPswRef.value !== '' &&
    oldPswRef.value !== newPswRef.value
  ) {
    return true
  }
  return false
})

const onChengePassword = handleSubmit(values => {
  // console.log('values', values)
  emit('changePassword', values)
})
</script>
