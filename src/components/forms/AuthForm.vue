<template>
  <div class="form-auth">
    <form @submit="loginHandler" class="space-y-5">
      <div class="input-block space-y-2">
        <label>Email</label>
        <app-input
          :inputType="
            errorEmail && metaEmail.touched ? 'border-error' : 'border'
          "
          inputSize="lg"
          v-model.trim="emailU"
          type="email"
          @blur="blurEmail"
        />
        <div
          v-if="errorEmail && metaEmail.touched"
          class="text-sm text-red-500"
        >
          {{ errorEmail }}
        </div>
      </div>
      <div class="input-block space-y-2">
        <label>Пароль</label>
        <app-input
          :inputType="errorPsw && metaPsw.touched ? 'border-error' : 'border'"
          inputSize="lg"
          v-model.trim="pswU"
          type="password"
          autocomplete="on"
          @blur="blurPsw"
        />
        <div v-if="errorPsw && metaPsw.touched" class="text-sm text-red-500">
          {{ errorPsw }}
        </div>
        <div>
          <app-button
            class="-ml-3"
            @click="rememberPassword"
            btnType="link"
            btnSize="md"
            >Забыли пароль?</app-button
          >
        </div>
      </div>
      <div class="flex flex-col space-y-2">
        <!-- TODO disabled state-->
        <app-button
          :disabled="!isSubmitActive || isTooManyAttempts || isSubmitting"
          type="submit"
          btnSize="lg"
        >
          <svg
            v-if="authIsProcess"
            role="status"
            class="inline mr-2 w-5 h-5 text-white animate-spin"
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
          Войти
        </app-button>
        <app-button
          btnType="secondary"
          @click="$router.push('/registration')"
          btnSize="lg"
          >Зарегистрироваться</app-button
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AppInput from "@/components/UI/Forms/AppInput.vue";
import AppButton from "@/components/UI/Buttons/AppButton.vue";

import { useAuthStore } from "@/stores/auth";
import { useAppMessage } from "@/stores/appMessage";
import { useCartStore } from "@/stores/cart";
import { useProfileStore } from "@/stores/profile";

import { useField, useForm } from "vee-validate";
import * as yup from "yup";

const authStore = useAuthStore();
const appMessageStore = useAppMessage();
const cartStore = useCartStore();
const profileStore = useProfileStore();

const authIsProcess = ref(false);

const { handleSubmit, submitCount, isSubmitting } = useForm();

const {
  value: emailU,
  errorMessage: errorEmail,
  handleBlur: blurEmail,
  meta: metaEmail,
} = useField(
  "emailU",
  yup
    .string()
    .email("Введите корректный email")
    .required("Введите ваш email")
    .trim()
);

const {
  value: pswU,
  errorMessage: errorPsw,
  handleBlur: blurPsw,
  meta: metaPsw,
} = useField("pswU", yup.string().required("Введите пароль").trim());

const isTooManyAttempts = computed(() => {
  return submitCount.value >= 10;
});

const isSubmitActive = computed(() => {
  return emailU.value && pswU.value;
});

const loginHandler = handleSubmit(async (values, { setErrors }) => {
  authIsProcess.value = true;
  const res = await authStore.login(values);
  if (res instanceof Error) {
    setErrors({ pswU: res.message });
  }
  authIsProcess.value = false;
});

function rememberPassword() {
  console.log("Remember password");
}
</script>
