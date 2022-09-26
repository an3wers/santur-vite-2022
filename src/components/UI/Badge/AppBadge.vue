<template>
  <span
    class="inline-flex space-x-1 border rounded-md font-semibold"
    :class="[badgeColor[color], badgeSize[size]]"
  >
    <slot>Badge</slot>
  </span>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'md'
  },
  color: {
    type: String,
    default: 'blue'
  }
})

const badgeSize = {
  xs: 'py-0.5 px-2 text-xs',
  md: 'py-1 px-2.5 text-sm',
  lg: 'py-1.5 px-2.5 text-base'
}

const badgeColor = {
    blue: 'bg-blue-500 text-white border-transparent',
    green: 'bg-green-500 text-white border-transparent',
    orange: 'bg-orange-500 text-white border-transparent',
    red: 'bg-red-500 text-white border-transparent',
    gray: 'bg-gray-500 text-white border-transparent',
    'outline-blue': 'border-blue-500 text-blue-500 bg-transparent',
    'outline-green': 'border-green-500 text-green-500 bg-transparent',
    'outline-orange': 'border-orange-500 text-orange-500 bg-transparent',
    'outline-red': 'border-red-500 text-red-500 bg-transparent',
    'outline-gray': 'border-gray-500 text-gray-500 bg-transparent',
    'light-blue': 'bg-blue-500 text-blue-500 border-transparent bg-opacity-20',
    'light-green': 'bg-green-500 text-green-500 border-transparent bg-opacity-20',
    'light-orange': 'bg-orange-500 text-orange-500 border-transparent bg-opacity-20',
    'light-red': 'bg-red-500 text-red-500 border-transparent bg-opacity-20',
    'light-gray': 'bg-gray-500 text-gray-500 border-transparent bg-opacity-20',
}

</script>
