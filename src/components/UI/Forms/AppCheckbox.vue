<template>
  <label class="inline-flex items-start">
    <input
      type="checkbox"
      :checked="modelValue"
      class="-mb-1 rounded border text-primary focus:border-blue-500 focus:ring focus:ring-offset-0 focus:ring-blue-500 focus:ring-opacity-20"
      :class="[checkboxType[type]]"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span v-if="isLabel" class="ml-2 -mt-1"><slot>Checkbox</slot></span>
  </label>
</template>

<script setup>

// TODO: rename checkbox with label

defineProps({
  modelValue: {
    type: Boolean,
        default: ''
    },
    type: {
      type: String,
      default: 'border' // filled
    },
    isLabel: {
      type: Boolean,
      default: true
    }
})
  
defineEmits(['update:modelValue'])

const checkboxType = {
  border: 'border-gray-400 bg-transparent',
  filled: 'border-transparent bg-slate-200 focus:border-transparent'
}



</script>
