<template>
  <div class="btn-group">
    <ul class="btn-group__header inline-flex rounded-md">
      <li
        class="py-2.5 leading-none px-4 cursor-pointer text-gray-900 bg-white border-t border-b border-gray-300 hover:border-gray-400 hover:z-10 last:rounded-r-md last:border first:border first:rounded-l-md"
        :class="[title === selectedTitle && 'bg-blue-100',  btnTitles.length === 2 && 'last:-ml-[1px]']"
        v-for="title in btnTitles"
        :key="title"
        @click="btnGroupHandler(title)"
      >
        {{ title }}
      </li>
    </ul>

    <slot />
  </div>
</template>

<script>
import { ref, provide } from 'vue'
export default {
  emits: ['onClickBtnGroup'],
  setup(props, { slots, emit }) {
    const btnTitles = ref(slots.default().map(btn => btn.props.title))
    const selectedTitle = ref(btnTitles.value[0]) // selected title by default

    provide('selectedTitle', selectedTitle)

    // selectedTitle = title

    function btnGroupHandler(title) {
      selectedTitle.value = title
      emit('onClickBtnGroup', title)
    }

    // props:

    // btnGroupSize

    return {
      btnTitles,
      selectedTitle,
      btnGroupHandler
    }
  }
}
</script>
