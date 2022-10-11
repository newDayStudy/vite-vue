<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { userStore } from "../store";
import { flatten } from "@/utils";
const route = useRoute();
const useUserStore = userStore();
const selectedKeys = ref([]);
const openKeys = ref([]);

const allMenus = flatten(useUserStore.menus);
watch(
  () => route,
  (v) => {
    console.log("路由变化", v);
    selectedKeys.value = [v.name];
    const parent_id = allMenus.find((item) => v.path == item.path)?.parent_id;
    if (parent_id) {
      openKeys.value = [parent_id];
    }
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <a-layout class="a-layout">
    <a-layout-sider theme="dark" :collapsed="useUserStore.collapsed">
      <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark"
        :open-keys="openKeys"
      >
        <a-sub-menu v-for="item in useUserStore.menus" :key="item.id">
          <template #title>
            <component :is="item.icon" />
            <span>{{ item.name }}</span></template
          >
          <a-menu-item v-for="sub in item.children" :key="sub.code">
            <router-link :to="sub.path">{{ sub.name }}</router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>
