<template>
  <div class="nav flex">
    <!-- mainMenu -->

    <Menu
      as="div"
      v-for="item in mainMenu"
      :key="item.name"
      class="relative inline-block text-left"
    >
      <div v-if="!!item.child">
        <MenuButton
          class="inline-flex justify-center items-center px-3 py-2 text-gray-500 hover:text-gray-900"
        >
          {{ item.name }}
          <expand-more-icon-20 color="#6b7280" />
        </MenuButton>

        <!-- START dropdown -->
        <transition
          enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <MenuItems
            class="origin-top-left absolute z-10 left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div class="py-2">
              <MenuItem
                v-for="subItem in item.child"
                :key="subItem.name"
                v-slot="{ active }"
              >
                <RouterLink
                  :to="subItem.url"
                  :class="[
                    active ? 'bg-slate-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 ml-1 mr-1 no-underline rounded-md text-[0.9375rem]'
                  ]"
                  >{{ subItem.name }}</RouterLink
                >
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
        <!-- END dropdown -->
      </div>
      <div v-else>
        <RouterLink :to="item.url" class="inline-flex justify-center items-center px-3 py-2 no-underline text-gray-500 hover:text-gray-900">{{item.name}}</RouterLink>
      </div>
    </Menu>
  </div>
</template>

<script setup>
import ExpandMoreIcon20 from '@/components/UI/Icons/ExpandMoreIcon_20.vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useMainMenu } from '@/utils/config'

const mainMenu = useMainMenu()
</script>
