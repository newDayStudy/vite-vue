<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const selectedKeys = ref([route.name]);
</script>

<template>
  <a-layout class="a-layout">
    <a-layout-sider theme="dark">
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline" theme="dark">
        <a-menu-item key="table">
          <router-link to="/table">表格</router-link>
        </a-menu-item>
        <a-menu-item key="calendar">
          <router-link to="/calendar"> 日历 </router-link>
        </a-menu-item>
        <a-menu-item key="form">
          <router-link to="/form"> 表单 </router-link>
        </a-menu-item>
        <a-menu-item key="question">
          <router-link to="/question"> 问卷 </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>
