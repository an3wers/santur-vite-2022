<template>
  <div class="nav flex">
    <!-- mainMenu -->

    <DropDownItem v-for="(item, index) in mainMenu" :item="item" :key="index" />
  </div>
</template>

<script setup>
import ExpandMoreIcon20 from "@/components/UI/Icons/ExpandMoreIcon_20.vue";
// import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { useMainMenu } from "@/utils/config";
import { ref, computed } from "vue";
import DropDownItem from "@/components/appHeader/DropDownItem.vue";

const mainMenu = useMainMenu();

const getMenuWithChild = computed(() => {
  return mainMenu.filter((el) => el.child.length);
});

const getMenuWithoutChild = computed(() => {
  return mainMenu.filter((el) => !el.child.length);
});
</script>
