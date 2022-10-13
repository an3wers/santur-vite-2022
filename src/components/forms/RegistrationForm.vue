<template>
  <div class="form-registration">
    <form @submit="onRegister" class="space-y-5">
      <div class="input-block space-y-2">
        <label for="">Фамилия и Имя</label>
        <app-input
          v-model.trim="nameR"
          @blur="blurName"
          :inputType="errorName && metaName.touched ? 'border-error' : 'border'"
          inputSize="lg"
        />
        <div v-if="errorName && metaName.touched" class="text-sm text-red-500">
          {{ errorName }}
        </div>
      </div>
      <div class="input-block space-y-2">
        <label for="">Email</label>
        <app-input
          type="email"
          v-model.trim="emailR"
          @blur="blurEmail"
          :inputType="
            errorEmail && metaEmail.touched ? 'border-error' : 'border'
          "
          inputSize="lg"
        />
        <div
          v-if="errorEmail && metaEmail.touched"
          class="text-sm text-red-500"
        >
          {{ errorEmail }}
        </div>
      </div>
      <div class="input-block space-y-2">
        <label for="">ИНН компании</label>
        <app-input
          type="number"
          v-model.trim="innR"
          @blur="blurInn"
          :inputType="errorInn && metaInn.touched ? 'border-error' : 'border'"
          inputSize="lg"
          maxlength="12"
        />
        <div v-if="errorInn && metaInn.touched" class="text-sm text-red-500">
          {{ errorInn }}
        </div>
      </div>
      <div class="input-block space-y-2">
        <label for="">Название компании</label>
        <app-input
          :inputType="
            errorCompany && metaCompany.touched ? 'border-error' : 'border'
          "
          v-model.trim="companyR"
          @blur="blurCompany"
          inputSize="lg"
        />
        <div
          v-if="errorCompany && metaCompany.touched"
          class="text-sm text-red-500"
        >
          {{ errorCompany }}
        </div>
      </div>
      <div class="text-left">
        <app-button
          class="mt-4"
          :disabled="!registrIsActive || isSubmitting"
          type="submit"
          btnSize="lg"
        >
          <svg
            v-if="registerProcessing"
            role="status"
            class="inline mr-3 w-5 h-5 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
          Зарегистрироваться
        </app-button>
      </div>
      <div class="text-sm">
        Нажимая на кнопку "зарегистрироваться", даю согласие на обработку моих
        персональных данных, с условиями политики ознакомлен.
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AppInput from "@/components/UI/Forms/AppInput.vue";
import AppButton from "@/components/UI/Buttons/AppButton.vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

const { handleSubmit, submitCount, isSubmitting } = useForm();

const registerProcessing = ref(false);

const MIN_LENGTH_VALUE = 4;
const MIN_LENGTH_INN = 10;
const MAX_LENGTH_INN = 12;

const {
  value: nameR,
  errorMessage: errorName,
  handleBlur: blurName,
  meta: metaName,
} = useField(
  "nameR",
  yup
    .string()
    .required("Введите ваше имя")
    .min(MIN_LENGTH_VALUE, `Минимальная длина поля ${MIN_LENGTH_VALUE} символа`)
    .trim()
);

const {
  value: emailR,
  errorMessage: errorEmail,
  handleBlur: blurEmail,
  meta: metaEmail,
} = useField(
  "emailR",
  yup
    .string()
    .email("Введите корректный email")
    .required("Введите ваш email")
    .trim()
);

const {
  value: innR,
  errorMessage: errorInn,
  handleBlur: blurInn,
  meta: metaInn,
} = useField(
  "innR",
  yup
    .string()
    .required("Введите ИНН компании")
    .min(MIN_LENGTH_INN, `Минимальная длина поля ${MIN_LENGTH_INN} символов`)
    .max(MAX_LENGTH_INN, `Максимальная длина поля ${MAX_LENGTH_INN} символов`)
    .trim()
);

const {
  value: companyR,
  errorMessage: errorCompany,
  handleBlur: blurCompany,
  meta: metaCompany,
} = useField(
  "companyR",
  yup
    .string()
    .required("Введите название компании")
    .min(MIN_LENGTH_VALUE, `Минимальная длина поля ${MIN_LENGTH_VALUE} символа`)
    .trim()
);

const registrIsActive = computed(() => {
  return nameR.value && emailR.value && innR.value && companyR.value;
});

const onRegister = handleSubmit((values, { resetForm }) => {
  console.log("Форма регистрации", values);
  resetForm();
});
</script>
