<script setup>
import { useRouter } from "vue-router";
import { userStore } from "@/store";
import { watch, reactive, computed } from "vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import src from "@/assets/logo.png";
dayjs.locale("zhCN");
const useUserStore = userStore();
const router = useRouter();
const logout = () => {
  localStorage.clear();
  useUserStore.bindUser(false);
  router.push("/login");
};
const padding = reactive({
  top: 0,
});
watch(
  () => useUserStore.isAuthenticated,
  (v) => {
    console.log("isAuthenticated", v);
    padding.top = v ? "60px" : 0;
    console.log("padding", padding);
  }
);
// const logo = new URL('/src/assets/logo.png', import.meta.url).href
</script>

<template>
  <a-config-provider :locale="zhCN">
    <a-layout-header
      v-if="useUserStore.isAuthenticated"
      class="a-layout-header"
    >
      <!-- <img :src="logo" width="30"/> -->
      <img src="@/assets/logo.png" width="30" height="30" />
      <!-- <img :src="src" alt=""> -->
      <div class="user">
        <a>admin</a>
        <a-button size="small" @click="logout">退出</a-button>
      </div>
    </a-layout-header>
    <a-layout-content
      class="a-layout-content"
      :class="{ 'a-layout-content__active': useUserStore.isAuthenticated }"
    >
      <router-view></router-view>
    </a-layout-content>
  </a-config-provider>
</template>

<style lang="css">
html,
body {
  height: 100%;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app {
  box-sizing: border-box;
  height: 100%;
}
.a-layout {
  overflow-y: auto;
  box-sizing: border-box;
  height: 100%;
}
</style>
<style lang="scss" scoped>
.a-layout-content {
  height: 100%;
}
.a-layout-content__active {
  height: calc(100% - 60px);
}
.a-layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  img {
    flex: none;
  }
}
.user {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  a {
    margin-right: 10px;
  }
}
</style>
