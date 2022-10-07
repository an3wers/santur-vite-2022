<template>
  <app-informer type="warning" icon="info">
    <div>
      <p v-if="statusDescr">{{statusDescr}}</p>
      <p v-if="commentGood">{{commentGood}}</p>
      <p v-if="commentMoney">{{commentMoney}}</p>
      <p v-if="commentChange">{{commentChange}}</p>
    </div>
    <app-button :disabled="!nextstepAvailable" @click="$emit('onConfirmOrder', id)" btnType="primary" btnSize="md">
      <btn-spinner v-if="orderIsConfirming" />
      {{nextstepTitle}}
    </app-button>
  </app-informer>
</template>

<script setup>
import AppInformer from '@/components/AppInformer.vue'
import AppButton from '@/components/UI/Buttons/AppButton.vue'
import BtnSpinner from '@/components/UI/Spinner/BtnSpinner.vue'

defineProps({
  id: {
    type: Number
  },
  nextstepAvailable: {
    type: Boolean,
    default: false
  },
  nextstepTitle: {
    type: String,
    default: ''
  },
  statusDescr: {
    type: String,
    default: ''
  },
  commentChange: {
    type: String,
    default: ''
  },
  commentGood: {
    type: String,
    default: ''
  },
  commentMoney: {
    type: String,
    default: ''
  },
  orderIsConfirming: {
    type: Boolean,
    default: false
  }
})

defineEmits(['onConfirmOrder'])
</script>
