<template>
  <input
    :type="type"
    :placeholder="placeholder"
    class="w-full rounded-md border form-input disabled:text-gray-500"
    :class="[typeMap[inputType], sizeMap[inputSize]]"
    :value="modelValue"
    :name="name"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    modelValue:{
        type: [String, Number]
    },
    inputType: {
      type: String,
      default: 'solid' // border
    },
    inputSize: {
      type: String,
      default: 'md' // lg, sm
    },
    placeholder: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: ''
    }
   
  },
  emits: ['update:modelValue'],
  setup() {
    const typeMap = {
      solid: 'bg-slate-150 hover:bg-slate-200 border-transparent focus:border-primary focus:bg-white focus:ring focus:ring-blue-200 focus:ring-opacity-50',
      border: 'bg-transparent border-gray-300 focus:border-primary focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100',
      'solid-error': 'bg-red-100 border-transparent focus:border-red-400 focus:bg-white focus:ring focus:ring-red-200 focus:ring-opacity-50',
      'border-error': 'bg-transparent border-red-400 focus:border-red-400 focus:ring focus:ring-red-200 focus:ring-opacity-50'
    }

    const sizeMap = {
      md: 'py-2 text-base px-3 leading-5',
      lg: 'py-2.5 text-lg px-4',
      xs: 'py-1.5 text-sm px-2.5'
    }

    return {
      typeMap,
      sizeMap
    }
  }
}
</script>
