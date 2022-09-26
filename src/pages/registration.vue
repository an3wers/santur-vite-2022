<template>
    <div class="registration-page bg-slate-150">
      <div class="container">
        <div class="grid grid-cols-12">
          <div class="col-start-4 col-span-6 xl:col-start-5 xl:col-span-4 pt-8 pb-16">
            <!-- Кнопка назад -->
            <app-go-back />
            <div class="w-full bg-white rounded-2xl py-8 px-6 shadow-md">
              <div class="text-2xl font-bold">Зарегистрироваться</div>
              <div class="pt-8">
                <registration-form />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // import { ref } from 'vue'
  // import AppButton from '@/components/UI/Buttons/AppButton.vue'
  import RegistrationForm from '@/components/forms/RegistrationForm.vue'
  import AppGoBack from '@/components/AppGoBack.vue'
  
  
  
  </script>
  