<script setup>
import { useRouter } from "vue-router";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zhCN");

const router = useRouter();
const lagout = () => {
  localStorage.clear();
  router.push("/login");
};
</script>

<template>
  <a-config-provider :locale="zhCN">
    <a-layout-header class="a-layout-header">
      <div class="user">
        <a>admin</a>
        <a-button size="small" @click="lagout">退出</a-button>
      </div>
    </a-layout-header>
    <router-view></router-view>
  </a-config-provider>
</template>

<style>
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
  padding-top: 60px;
}

.a-layout {
  overflow-y: auto;
  box-sizing: border-box;
  height: 100%;
}
</style>
<style lang="scss" scoped>
.a-layout-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 222;
}
.user {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  a {
    margin-right: 10px;
    color: #fff;
  }
}
</style>
