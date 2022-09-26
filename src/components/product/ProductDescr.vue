<template>
  <div class="product-descr mt-6">
    <!-- Меню -->
    <div class="font-medium text-center border-b sticky top-0 bg-white/80">
      <ul class="product-descr__nav flex flex-wrap -mb-px space-x-6">
        <li
          v-for="tab in sections"
          :key="tab.alias"
          :class="[!tab.enable ? 'disabled' : '', current === tab.alias ? 'active' : '']"
          :data-section="tab.alias"
          class="product-descr__nav-item"
        >
          <a
            @click.prevent="$emit('onClickTab', tab)"
            :href="`#${tab.alias}`"
            :disabled="!tab.enable"
            class="no-underline inline-block outline-none py-4 border-b-2 focus:shadow-none focus:rounded-none"
            aria-current="page"
          >
            {{ tab.name }}
          </a>
        </li>
      </ul>
    </div>
    
    <div v-if="enableSection.length">
      <product-descr-section
      v-for="section in enableSection"
      :key="section.alias"
      :title="section.name"
      :alias="section.alias"
    >
      <div v-if="section.alias === 'characteristics'" class="col-start-1 col-end-8">
        <ul class="list-none divide-y">
          <li
            v-for="item in characteristics"
            :key="item.Name"
            class="py-3 first:pt-0 last:pb-0 flex justify-between items-start space-x-3"
          >
            <span>{{ item.Name }}</span>
            <span class="text-right">{{ item.Value }}</span>
          </li>
        </ul>
      </div>
      <!-- test: -->
      <div v-else class="col-start-1 col-end-8">
        
      </div>
    </product-descr-section>
    </div>
    

  </div>
</template>

<script setup>
import {computed } from 'vue'
import ProductDescrSection from '@/components/product/ProductDescrSection.vue'

const props = defineProps({
  characteristics: {
    type: Array,
    default: []
  },
  sections: {
    type: Array,
    default: []
  },
  current: {
    type: String
  }

})

const emit = defineEmits(['onClickTab'])

const enableSection = computed(() => {
  return props.sections.filter(el => el.enable)
})

</script>
