<template>
  <div class="flex justify-between py-6">
    <div class="flex space-x-2 flex-wrap">
      <div class="inline-flex items-center" v-if="current >= 5">
        <button
          @click="onChange(startItem.p)"
          class="py-2 font-medium px-3 leading-5 rounded-md border border-transparent text-primary bg-transparent"
        >
          {{ startItem.p }}
        </button>
        <span class="font-medium text-primary">…</span>
      </div>
      <button
        :class="[
          p.isActive
            ? 'bg-primary hover:bg-primary-hover text-white'
            : 'text-primary bg-transparent',
        ]"
        class="py-2 text-base px-3 font-medium leading-5 rounded-md border border-transparent"
        @click="onChange(p.p)"
        v-for="(p, index) in pagesArr"
        :key="index"
      >
        {{ p.p }}
      </button>
      <div
        class="inline-flex items-center"
        v-if="countPages > step * 2 && countPages - current > 3"
      >
        <span class="font-medium text-primary">…</span>
        <button
          @click="onChange(endItem.p)"
          class="py-2 text-base px-3 leading-5 font-medium rounded-md border border-transparent text-primary bg-transparent"
        >
          {{ endItem.p }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  current: {
    type: Number,
  },
  countPages: {
    type: Number,
  },
});

const emit = defineEmits(["change"]);

const pageStart = 1;
const step = 3;

const getPagesArrFull = computed(() => {
  const arr = [];

  for (let i = pageStart; i <= props.countPages; i++) {
    if (i === props.current) {
      arr.push({ p: i, isActive: true });
    } else {
      arr.push({ p: i, isActive: false });
    }
  }

  return arr;
});

const endItem = computed(() => {
  const arr = getPagesArrFull.value.slice();
  return arr.pop();
});

const startItem = computed(() => {
  const arr = getPagesArrFull.value.slice();
  return arr.shift();
});

const pagesArr = computed(() => {
  if (props.current - step < 0 || props.current - step === 0) {
    return getPagesArrFull.value.slice(0, step * 2);
  } else {
    return getPagesArrFull.value.slice(
      props.current - 1 - step,
      props.current + step
    );
  }
});

function onChange(p) {
  getPagesArrFull.value.forEach((el) => {
    if (el.p === p) {
      el.isActive = true;
    } else {
      el.isActive = false;
    }
  });
  emit("change", p);
}
</script>
