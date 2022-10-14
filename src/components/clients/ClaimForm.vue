<template>
  <form @submit.prevent="onSubmit" class="space-y-8">
    <p>* — поля обязательные для заполнения</p>

    <div>
      <div class="text-xl mb-4 font-medium">Причина обращения</div>
      <app-selector-slots
        inputSize="md"
        inputType="border"
        v-model="selectedReason"
      >
        <option disabled="disabled" value="default">Выбрать причину</option>
        <option v-for="item in reasons" :key="item.name" :value="item.value">
          {{ item.name }}
        </option>
      </app-selector-slots>
    </div>
    <div>
      <div class="text-xl mb-4 font-medium">Ваши данные</div>
      <div class="grid grid-cols-2 gap-x-4 gap-y-4">
        <div class="input-group space-y-2 col-span-2">
          <label>ФИО</label>
          <app-input
            type="text"
            inputSize="md"
            inputType="border"
            placeholder="Введите ваше имя"
            v-model.trim="name"
          />
        </div>
        <div class="input-group space-y-2">
          <label>Телефон</label>
          <app-input
            type="tel"
            inputSize="md"
            v-mask="'+# (###) ###-##-##'"
            inputType="border"
            placeholder="Введите ваш телефон"
            v-model="phone"
          />
          <div class="text-sm text-gray-500">Например: +7 (912) 345-67-89</div>
        </div>
        <div class="input-group space-y-2">
          <label>Email*</label>
          <app-input
            type="text"
            inputSize="md"
            :inputType="
              errorEmail && metaEmail.touched ? 'border-error' : 'border'
            "
            placeholder="Введите ваш email"
            v-model.trim="email"
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
          <label>Компания*</label>
          <app-input
            type="text"
            inputSize="md"
            :inputType="
              errorCompany && metaCompany.touched ? 'border-error' : 'border'
            "
            placeholder="Введите наименование компании"
            v-model.trim="company"
            @blur="blurCompany"
          />
          <div
            v-if="errorCompany && metaCompany.touched"
            class="text-sm text-red-500"
          >
            {{ errorCompany }}
          </div>
        </div>
        <div class="input-group space-y-2">
          <label>ИНН*</label>
          <app-input
            type="number"
            inputSize="md"
            :inputType="errorInn && metaInn.touched ? 'border-error' : 'border'"
            placeholder="Введите ИНН компании"
            v-model.trim="inn"
            @blur="blurInn"
          />
          <div v-if="errorInn && metaInn.touched" class="text-sm text-red-500">
            {{ errorInn }}
          </div>
        </div>
        <div class="input-group space-y-2 col-span-2">
          <label>Комментарий*</label>
          <app-textarea
            v-model.trim="comment"
            @blur="blurComment"
            :inputType="
              errorComment && metaComment.touched ? 'border-error' : 'border'
            "
          />
          <div
            v-if="errorComment && metaComment.touched"
            class="text-sm text-red-500"
          >
            {{ errorComment }}
          </div>
        </div>
      </div>
      <div class="mt-4">
        <p>
          <strong
            >Для рассмотрения претензии необходимо приложить следующие
            файлы:</strong
          >
        </p>
        <ul>
          <li>Заявление на возврат с подписью и печатью (скачать бланк).</li>
          <li>
            Копии УПД и/или транспортной накладной, по которым передавался
            товар.
          </li>
          <li>
            Если брак или нарушение товарного вида — фотографии (с видимыми
            повреждениями).
          </li>
        </ul>
        <p>
          Вложенные файлы (в форматах DOC, DOCX, RTF, XLS, XLSX, TXT, JPG, JPEG,
          BMP, GIF, PNG, ZIP, AVI, MP4, MOV или PDF) не превышающие 20 МБ.
        </p>
      </div>
      <div class="space-y-4">
        <div class="input-group">
          <input
            class=""
            id="file_input_one"
            type="file"
            @change="uploadFileHandler($event)"
          />
        </div>
        <div class="input-group">
          <input
            class=""
            id="file_input_two"
            type="file"
            @change="uploadFileHandler($event)"
          />
        </div>
        <div class="input-group">
          <input
            class=""
            id="file_input_three"
            type="file"
            @change="uploadFileHandler($event)"
          />
        </div>
      </div>
    </div>
    <app-button
      btnSize="lg"
      :disabled="!getIsSubmit || isSubmitting"
      type="submit"
    >
      <btn-spinner v-if="formIsSubmiting" />
      Подать рекламацию
    </app-button>
  </form>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import AppSelectorSlots from "@/components/UI/Forms/AppSelectorSlots.vue";
import AppInput from "@/components/UI/Forms/AppInput.vue";
import AppTextarea from "@/components/UI/Forms/AppTextarea.vue";
import AppButton from "@/components/UI/Buttons/AppButton.vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import BtnSpinner from "@/components/UI/Spinner/BtnSpinner.vue";
import { useAppMessage } from "@/stores/appMessage";
import axios from "axios";

const MIN_LENGTH_INN = 10;
const MAX_LENGTH_INN = 12;

const reasons = [
  {
    name: "Технический брак",
    value: "1",
  },
  {
    name: "Недовоз, излишек, пересорт",
    value: "2",
  },
  {
    name: "Нарушение товарного вида (технические повреждения)",
    value: "3",
  },
  {
    name: "Недостача внутри заводской упаковки",
    value: "4",
  },
  {
    name: "Пересорт внутри заводской упаковки",
    value: "5",
  },
  {
    name: "Жалоба на торгового агента",
    value: "6",
  },
  {
    name: "Брак с ущербом",
    value: "7",
  },
];

const appMessageStore = useAppMessage();

const selectedReason = ref("default");

const formIsSubmiting = ref(false);

const { handleSubmit, submitCount, isSubmitting } = useForm();

const {
  value: name,
  errorMessage: errorName,
  handleBlur: blurName,
  meta: metaName,
} = useField("name", yup.string().trim());
const {
  value: phone,
  errorMessage: errorPhone,
  handleBlur: blurPhone,
  meta: metaPhone,
} = useField("phone", yup.string().trim());
const {
  value: company,
  errorMessage: errorCompany,
  handleBlur: blurCompany,
  meta: metaCompany,
} = useField(
  "company",
  yup.string().required("Введите название компании").trim()
);
const {
  value: inn,
  errorMessage: errorInn,
  handleBlur: blurInn,
  meta: metaInn,
} = useField(
  "inn",
  yup
    .string()
    .required("Введите ИНН компании")
    .min(MIN_LENGTH_INN, `Минимальная длина поля ${MIN_LENGTH_INN} символов`)
    .max(MAX_LENGTH_INN, `Максимальная длина поля ${MAX_LENGTH_INN} символов`)
    .trim()
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
    .email("Введите корректный email")
    .required("Введите ваш email")
    .trim()
);
const {
  value: comment,
  errorMessage: errorComment,
  handleBlur: blurComment,
  meta: metaComment,
} = useField(
  "comment",
  yup.string().required("Введите ваш комментарий").trim()
);

const formFiles = reactive({
  file_one: "",
  file_two: "",
  file_three: "",
});

const getIsSubmit = computed(() => {
  return selectedReason.value !== "default";
});

function uploadFileHandler(event) {
  switch (event.target.id) {
    case "file_input_one":
      formFiles.file_one = event.target.files[0];
      break;
    case "file_input_two":
      formFiles.file_two = event.target.files[0];
      break;
    case "file_input_three":
      formFiles.file_three = event.target.files[0];
      break;
    default:
      break;
  }
}

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  const { name, phone, company, inn, email, comment } = values;
  const data = new FormData();

  data.append("authorname", name);
  data.append("subjectname", company);
  data.append("subjectinn", inn);
  data.append("phone", phone);
  data.append("email", email);
  data.append("descr", comment);
  data.append("reason", selectedReason.value);
  data.append("file_1", formFiles.file_one);
  data.append("file_2", formFiles.file_two);
  data.append("file_3", formFiles.file_three);

  // selectedReason.value

  /*

  SendClaim
  поля формы:
  authorname
  subjectname
  subjectinn
  phone
  email
  descr - описание претензии
  reason - причина обращ
  file_1
  file_2
  file_3
  
  */

  try {
    formIsSubmiting.value = true;
    const res = await axios({
      method: "post",
      url: "https://isantur.ru/apissz/SendClaim",
      withCredentials: true,
      data: data,
    });

    if (res.success) {
    } else {
      throw new Error(res.message || "При отправки формы произошла ошибка");
    }

    // Обнуляем данные
    resetForm();
    selectedReason.value = "default";
    formFiles.file_one = "";
    formFiles.file_two = "";
    formFiles.file_three = "";

    // console.log("Forms", values);

    formIsSubmiting.value = false;
    appMessageStore.open("success", "Рекламация успешно отправлена", "success");
  } catch (error) {
    // console.log(error);
    appMessageStore.open("error", error, "error");
  }
});
</script>
