<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { userStore } from "../store";
import { flatten } from "@/utils";
const route = useRoute();
const router = useRouter();
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
watch(
  () => useUserStore.activeKey,
  (v) => {
    router.push("/" + v);
  }
);
const onEdit = (targetKey, action) => {
  useUserStore.clearPanel(router, targetKey);
};
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
    <a-layout-content style="height: 100%; overflow: auto">
      <div class="tabs" style="position: fixed; z-index: 1; width: 100%">
        <a-tabs
          v-model:activeKey="useUserStore.activeKey"
          tab-position="top"
          :tab-bar-gutter="0"
          hide-add
          type="editable-card"
          @edit="onEdit"
        >
          <a-tab-pane
            v-for="item in useUserStore.tabs"
            :key="item.name"
            :tab="item.meta?.pathname"
            :closable="item.name != 'home'"
          ></a-tab-pane>
        </a-tabs>
      </div>

      <div style="padding-top: 35px">
        <router-view v-if="route.name != 'home'"></router-view>
        <a-layout v-else>
          <h1 class="welcome">欢迎进入<i>Welcome</i></h1>
        </a-layout>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<style lang="scss" scoped>
.welcome {
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  i {
    font-size: 14px;
    font-style: normal;
  }
}
.tabs {
  background-image: linear-gradient(#fff, #ccc);
  :deep() .ant-tabs-nav {
    margin: 0;
  }
}
</style>
