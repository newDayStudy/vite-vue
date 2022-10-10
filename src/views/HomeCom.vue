<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { userStore } from "../store";
const route = useRoute();
const useUserStore = userStore();
const selectedKeys = ref([]);
watch(
  () => route,
  (v) => {
    console.log("路由变化", v);
    selectedKeys.value = [v.name];
    console.log("selectedKeys", selectedKeys);
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <a-layout class="a-layout">
    <a-layout-sider theme="dark">
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline" theme="dark">
        <a-sub-menu v-for="item in useUserStore.menus" :key="item.id">
          <template #title>
            <!-- <a-icon :type="item.icon" /> -->
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
