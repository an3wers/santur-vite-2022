<template>
  <input
    type="text"
    :placeholder="placeholder"
    class="form-input w-full text-lg pl-4 pr-10 bg-slate-200 py-2.5 rounded-md border-transparent focus:border-primary focus:bg-white focus:ring focus:ring-blue-200 focus:ring-opacity-50"
  />
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: true
    }
  },
  setup() {}
}
</script>
