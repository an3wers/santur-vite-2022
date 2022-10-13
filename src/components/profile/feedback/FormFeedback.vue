<template>
  <div class="p-6 border border-gray-300 rounded-xl">
    <div class="text-2xl font-bold mb-5">
      Техническая поддержка, вопросы и предложения
    </div>
    <form @submit="fromFeedbackHandler" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="input-group space-y-2">
          <label>Имя и Фамилия</label>
          <app-input
            v-model.trim="name"
            type="text"
            :inputType="
              errorName && metaName.touched ? 'border-error' : 'border'
            "
            inputSize="md"
            @blur="blurName"
          />
          <div
            v-if="errorName && metaName.touched"
            class="text-sm text-red-500"
          >
            {{ errorName }}
          </div>
        </div>
        <div class="input-group space-y-2">
          <label>Email</label>
          <app-input
            v-model.trim="email"
            type="email"
            :inputType="
              errorEmail && metaEmail.touched ? 'border-error' : 'border'
            "
            inputSize="md"
            @blur="blurEmail"
          />
          <div
            v-if="errorEmail && metaEmail.touched"
            class="text-sm text-red-500"
          >
            {{ errorEmail }}
          </div>
        </div>
        <div class="input-group space-y-2">
          <label>Название компании</label>
          <app-input
            v-model.trim="comapyName"
            type="text"
            inputType="border"
            inputSize="md"
          />
        </div>
        <div class="input-group space-y-2">
          <label>ИНН компании</label>
          <app-input
            v-model.trim="companyInn"
            type="number"
            :inputType="
              errorCompanyInn && metaCompanyInn.touched
                ? 'border-error'
                : 'border'
            "
            inputSize="md"
            @blur="blurCompanyInn"
          />
          <div
            v-if="errorCompanyInn && metaCompanyInn.touched"
            class="text-sm text-red-500"
          >
            {{ errorCompanyInn }}
          </div>
        </div>
      </div>
      <div class="input-group space-y-2">
        <label>Комментарий</label>
        <app-textarea
          v-model.trim="comment"
          :inputType="
            errorComment && metaComment.touched ? 'border-error' : 'border'
          "
          @blur="blurComment"
        />
        <div
          class="text-sm text-red-500"
          v-if="errorComment && metaComment.touched"
        >
          {{ errorComment }}
        </div>
      </div>
      <app-button
        :disabled="!isBtnSubmit || isTooManyAttempts || isSubmitting"
        type="submit"
        >Отправить</app-button
      >
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AppInput from "@/components/UI/Forms/AppInput.vue";
import AppTextarea from "@/components/UI/Forms/AppTextarea.vue";
import AppButton from "@/components/UI/Buttons/AppButton.vue";
import { useAppMessage } from "@/stores/appMessage";
import { useProfileStore } from "@/stores/profile";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

const { handleSubmit, submitCount, isSubmitting } = useForm();

const profileStore = useProfileStore();
const appMessage = useAppMessage();

const MIN_LENGTH_VALUE = 4;
const MIN_LENGTH_COMMENT = 6;
const MIN_LENGTH_INN = 10;
const MAX_LENGTH_INN = 12;

const {
  value: name,
  errorMessage: errorName,
  handleBlur: blurName,
  meta: metaName,
} = useField(
  "name",
  yup
    .string()
    .required("Введите ваше имя")
    .min(
      MIN_LENGTH_VALUE,
      `Минимальная длина поля ${MIN_LENGTH_VALUE} символа`
    ),
  {
    initialValue:
      profileStore.profile.name && profileStore.profile.name === "Гость"
        ? ""
        : profileStore.profile.name,
  }
);
const {
  value: email,
  errorMessage: errorEmail,
  handleBlur: blurEmail,
  meta: metaEmail,
} = useField(
  "email",
  yup
    .string()
    .required("Введите ваш email")
    .email("Введите корректный email")
    .trim(),
  { initialValue: profileStore.profile.email || "" }
);
const {
  value: comapyName,
  errorMessage: errorCompanyName,
  handleBlur: blurCompanyName,
  meta: metaCompanyName,
} = useField("comapyName", yup.string(), {
  initialValue: profileStore.profile.subjInfo.name || "",
});

const {
  value: companyInn,
  errorMessage: errorCompanyInn,
  handleBlur: blurCompanyInn,
  meta: metaCompanyInn,
} = useField(
  "companyInn",
  yup
    .string()
    .min(MIN_LENGTH_INN, `Минимальная длина поля ${MIN_LENGTH_INN} символов`)
    .max(MAX_LENGTH_INN, `Максимальная длина поля ${MAX_LENGTH_INN} символов`)
    .trim(),
  {
    initialValue: profileStore.profile.subjInfo.inn || undefined,
  }
);

const {
  value: comment,
  errorMessage: errorComment,
  handleBlur: blurComment,
  meta: metaComment,
} = useField(
  "comment",
  yup
    .string()
    .required("Введите ваш комментарий")
    .min(
      MIN_LENGTH_COMMENT,
      `Минимальная длина поля ${MIN_LENGTH_COMMENT} символов`
    )
);

const isBtnSubmit = computed(() => {
  if (comment.value) {
    return comment.value.length >= MIN_LENGTH_COMMENT;
  }
});

// const resetForm = useResetForm()
const isTooManyAttempts = computed(() => {
  return submitCount.value >= 10;
});

const fromFeedbackHandler = handleSubmit((values, { resetForm }) => {
  console.log("ФОРМА", values, submitCount.value);
  resetForm();
  appMessage.openWithTimer(
    "success",
    "Сообщение успешно отправлено",
    "success"
  );
});
</script>
