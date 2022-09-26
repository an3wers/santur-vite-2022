<template>
  <div class="category-filter__item pt-4 space-y-3">
    <div class="font-bold">{{ filter.Name }}</div>

    <!-- Инпуть фильтра -->
    <div v-if="filter.Items.length > 10" class="relative">
      <input
        type="text"
        class="w-full rounded-md border form-input bg-white border-transparent focus:border-primary focus:ring focus:ring-blue-200 focus:ring-opacity-50 py-1.5 text-sm px-2.5"
        placeholder="Найти"
        v-model="inputFilterValue"
      />
      <close-icon-20
        @click="cleanInputFilterValue"
        v-if="inputFilterValue.length"
        color="#6b7280"
        class="absolute right-1 top-2 cursor-pointer"
      />
    </div>

    <div
      class="category-filter__body overflow-y-auto max-h-80 pr-4 flex flex-col space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200 scrollbar-thumb-rounded-md"
    >
      <label
        v-for="item in filteredFilterItems"
        :key="item.Name"
        :class="{ 'opacity-50': !!!item.QtyRecords }"
        class="inline-flex items-start"
      >
        <input
          type="checkbox"
          :value="item.Name"
          :checked="item.isChecked"
          :disabled="!item.QtyRecords"
          @change="checkboxClick(filter.Name, $event)"
          class="-mb-1 rounded border-gray-400 text-primary focus:border-blue-500 focus:ring focus:ring-offset-0 focus:ring-blue-500 focus:ring-opacity-20 bg-transparent"
        />
        <span class="ml-2 -mt-1"
          >{{ item.Name }}
          <span class="ml-1 text-sm text-gray-400"
            >({{ item.QtyRecords }})</span
          ></span
        >
      </label>
    </div>
  </div>
</template>

<script setup>
import AppCheckbox from '@/components/UI/Forms/AppCheckbox.vue'
import CloseIcon20 from '@/components/UI/Icons/CloseIcon_20.vue'
import { ref, computed } from 'vue'

// На этом этапе мне нужно передать props chekced, это значит объект filter должен иметь свойство isChecked
const props = defineProps({
  filter: {
    type: Object,
    defaults: {}
  }
})

const inputFilterValue = ref('')

const emit = defineEmits(['setFilter'])

const filteredFilterItems = computed(() => {
  return props.filter.Items.filter(el => el.Name.toLowerCase().includes(inputFilterValue.value.toLowerCase()))
})

function cleanInputFilterValue() {
  inputFilterValue.value = ''
}

function checkboxClick(filter, event) {
  emit('setFilter', filter, event)
}
</script>
