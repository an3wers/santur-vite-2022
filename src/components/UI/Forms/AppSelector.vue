<template>
  <!--  @change="$emit('update:modelValue', $event.target.value)" -->
  <!-- TODO: Сделать новый компонент через slot -->
  <select
    class="w-full rounded-md border form-select disabled:text-gray-500"
    :class="[typeMap[inputType], sizeMap[inputSize]]"
    v-model="selected"
    @change="$emit('onChange', $event.target.value)"
  >
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.text }}
    </option>
  </select>
</template>

<script setup>
defineProps({
  options: {
    type: Array,
    default: []
  },
  selected: {
    type: String
  },
  inputType: {
    type: String,
    default: 'solid' // border
  },
  inputSize: {
    type: String,
    default: 'md' // lg, sm
  },
  defaultValue: {
    type: String
  }
})

defineEmits(['onChange'])

const typeMap = {
  solid:
    'bg-slate-150 hover:bg-slate-200 border-transparent focus:border-primary focus:bg-white focus:ring focus:ring-blue-500 focus:ring-opacity-20',
  border:
    'bg-transparent border-gray-300 focus:border-primary focus:ring focus:ring-blue-500 focus:ring-opacity-20',
  'solid-error':
    'bg-red-100 border-transparent focus:border-red-400 focus:bg-white focus:ring focus:ring-red-200 focus:ring-opacity-50',
  'border-error':
    'bg-transparent border-red-400 focus:border-red-400 focus:ring focus:ring-red-200 focus:ring-opacity-50'
}

const sizeMap = {
  md: 'py-2 text-base px-3 leading-5',
  lg: 'py-2.5 text-lg px-4',
  xs: 'py-1.5 text-sm px-2.5'
}
</script>
