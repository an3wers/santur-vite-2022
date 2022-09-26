<template>
    <div class="container">
      <h1>UI Kit</h1>
  
      <!-- Кнопки -->
  
      <div class="my-6 p-6 space-y-6 rounded-xl border border-gray-300">
        <div class="flex items-center space-x-4">
          <app-button @click="handleTestClick">Кнопка</app-button>
          <app-button btnType="secondary" @click="handleTestClick"
            >Кнопка</app-button
          >
          <app-button btnType="outline" @click="handleTestClick"
            >Кнопка</app-button
          >
          <app-button btnType="link" @click="handleTestClick">Кнопка</app-button>
          <app-button btnType="light" @click="handleTestClick">Кнопка</app-button>
        </div>
        <div class="flex items-center space-x-4">
          <app-button @click="handleTestClick"
            ><favorite-icon-20 class="mr-1" color="#ffffff" />Кнопка</app-button
          >
          <app-button btnType="secondary" @click="handleTestClick"
            ><favorite-icon-20 color="#475569" class="mr-1" />Кнопка</app-button
          >
          <app-button btnType="outline" @click="handleTestClick"
            ><favorite-icon-20 class="mr-1" />Кнопка</app-button
          >
          <app-button btnType="link" @click="handleTestClick"
            ><favorite-icon-20 color="#1976D2" class="mr-1" />Кнопка</app-button
          >
          <app-button btnType="light" @click="handleTestClick"
            ><favorite-icon-20 class="mr-1" />Кнопка</app-button
          >
        </div>
        <div class="flex items-center space-x-4">
          <app-button btnSize="lg" @click="handleTestClick">Кнопка</app-button>
          <app-button btnSize="lg" btnType="secondary" @click="handleTestClick"
            >Кнопка</app-button
          >
          <app-button btnSize="lg" btnType="outline" @click="handleTestClick"
            >Кнопка</app-button
          >
          <app-button btnSize="lg" btnType="link" @click="handleTestClick"
            >Кнопка</app-button
          >
          <app-button btnSize="lg" btnType="light" @click="handleTestClick"
            >Кнопка</app-button
          >
        </div>
        <div class="flex items-center space-x-4">
          <app-button btnSize="lg" @click="handleTestClick"
            ><favorite-icon-24 class="mr-1" color="#ffffff" />Кнопка</app-button
          >
          <app-button btnSize="lg" btnType="secondary" @click="handleTestClick"
            ><favorite-icon-24 color="#475569" class="mr-1" />Кнопка</app-button
          >
          <app-button btnSize="lg" btnType="outline" @click="handleTestClick"
            ><favorite-icon-24 class="mr-1" />Кнопка</app-button
          >
          <app-button btnSize="lg" btnType="link" @click="handleTestClick"
            ><favorite-icon-24 color="#1976D2" class="mr-1" />Кнопка</app-button
          >
          <app-button btnSize="lg" btnType="light" @click="handleTestClick"
            ><favorite-icon-24 class="mr-1" />Кнопка</app-button
          >
        </div>
      </div>
  
      <!-- Инпуты -->
      <div class="my-6 p-6 space-y-6 rounded-xl border border-gray-300">
        <div class="flex items-center space-x-4">
          <app-input placeholder="Введите текст" v-model="testValue1" />
          <app-input
            placeholder="Введите текст"
            inputType="border"
            v-model="testValue2"
          />
        </div>
        <div class="flex items-center space-x-4">
          <app-input
            placeholder="Введите текст"
            inputSize="lg"
            v-model="testValue3"
          />
          <app-input
            placeholder="Введите текст"
            inputSize="lg"
            inputType="border"
            v-model="testValue4"
          />
        </div>
        <div class="flex items-center space-x-4">
          <app-input
            placeholder="Введите текст"
            inputSize="xs"
            v-model="testValue1"
          />
          <app-input
            placeholder="Введите текст"
            inputSize="xs"
            inputType="border"
            v-model="testValue2"
          />
        </div>
  
        <div class="flex items-center space-x-4">
          <app-input
            placeholder="Введите текст"
            inputSize="md"
            inputType="solid-error"
            v-model="testValue3"
          />
          <app-input
            placeholder="Введите текст"
            inputSize="md"
            inputType="border-error"
            v-model="testValue4"
          />
        </div>
      </div>
  
      <!-- Информеры -->
      <div class="my-6 p-6 space-y-6 rounded-xl border border-gray-300">
        <app-informer />
        <app-informer icon="error" type="error" />
        <app-informer icon="warning" type="warning" />
        <app-informer icon="success" type="success" />
        <app-informer icon="info" type="primary" />
        <app-informer icon="none" type="primary" />
      </div>
  
      <!-- Бэйджи -->
  
      <div class="my-6 p-6 space-y-4 rounded-xl border border-gray-300">
        <div class="space-y-4 space-x-4">
          <app-badge />
          <app-badge color="green" />
          <app-badge color="orange" />
          <app-badge color="red" />
          <app-badge color="gray" />
        </div>
        <div class="space-y-4 space-x-4">
          <app-badge size="xs" />
          <app-badge size="xs" color="green" />
          <app-badge size="xs" color="orange" />
          <app-badge size="xs" color="red" />
          <app-badge size="xs" color="gray" />
        </div>
        <div class="space-y-4 space-x-4">
          <app-badge size="lg" />
          <app-badge size="lg" color="green" />
          <app-badge size="lg" color="orange" />
          <app-badge size="lg" color="red" />
          <app-badge size="lg" color="gray" />
        </div>
  
        <div class="space-y-4 space-x-4">
          <app-badge color="outline-blue" />
          <app-badge color="outline-green" />
          <app-badge color="outline-orange" />
          <app-badge color="outline-red" />
          <app-badge color="outline-gray" />
        </div>
        <div class="space-y-4 space-x-4">
          <app-badge size="xs" color="outline-blue" />
          <app-badge size="xs" color="outline-green" />
          <app-badge size="xs" color="outline-orange" />
          <app-badge size="xs" color="outline-red" />
          <app-badge size="xs" color="outline-gray" />
        </div>
        <div class="space-y-4 space-x-4">
          <app-badge size="lg" color="outline-blue" />
          <app-badge size="lg" color="outline-green" />
          <app-badge size="lg" color="outline-orange" />
          <app-badge size="lg" color="outline-red" />
          <app-badge size="lg" color="outline-gray" />
        </div>
  
        <div class="space-y-4 space-x-4">
          <app-badge color="light-blue" />
          <app-badge color="light-green" />
          <app-badge color="light-orange" />
          <app-badge color="light-red" />
          <app-badge color="light-gray" />
        </div>
        <div class="space-y-4 space-x-4">
          <app-badge size="xs" color="light-blue" />
          <app-badge size="xs" color="light-green" />
          <app-badge size="xs" color="light-orange" />
          <app-badge size="xs" color="light-red" />
          <app-badge size="xs" color="light-gray" />
        </div>
        <div class="space-y-4 space-x-4">
          <app-badge size="lg" color="light-blue" />
          <app-badge size="lg" color="light-green" />
          <app-badge size="lg" color="light-orange" />
          <app-badge size="lg" color="light-red" />
          <app-badge size="lg" color="light-gray" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AppButton from '@/components/UI/Buttons/AppButton.vue'
  import AppInput from '@/components/UI/Forms/AppInput.vue'
  import FavoriteIcon20 from '@/components/UI/Icons/FavoriteIcon_20.vue'
  import FavoriteIcon24 from '@/components/UI/Icons/FavoriteIcon_24.vue'
  import AppInformer from '@/components/AppInformer.vue'
  import AppBadge from '@/components/UI/Badge/AppBadge.vue'
  
  import { ref } from 'vue'
  
  export default {
    setup() {
      const testValue1 = ref('')
      const testValue2 = ref('')
      const testValue3 = ref('')
      const testValue4 = ref('')
  
      function handleTestClick() {
        console.log('Click, click!!!')
      }
  
      return {
        handleTestClick,
        testValue1,
        testValue2,
        testValue3,
        testValue4
      }
    },
  
    components: {
      AppButton,
      AppInput,
      AppInformer,
      FavoriteIcon20,
      FavoriteIcon24,
      AppBadge
    }
  }
  </script>
  