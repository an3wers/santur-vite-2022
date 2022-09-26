<template>
  <select
    class="w-full rounded-md border form-select disabled:text-gray-500"
    :class="[typeMap[inputType], sizeMap[inputSize]]"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <slot>
      <option value="A">A</option>
      <option value="B">B</option>
    </slot>
  </select>
</template>

<script setup>
defineProps({
  inputType: {
    type: String,
    default: 'solid' // border
  },
  inputSize: {
    type: String,
    default: 'md' // lg, sm
  },
  modelValue: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])

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
  md: 'py-2 text-base pl-3 pr-7 leading-5',
  lg: 'py-2.5 text-lg pl-4 pr-8',
  xs: 'py-1.5 text-sm pl-2.5 pr-8'
}
</script>
