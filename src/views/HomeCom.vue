<script setup></script>

<template>
  <a-layout class="a-layout">
    <a-layout-sider theme="dark">
      <a-menu mode="inline" theme="dark">
        <a-menu-item key="0">
          <router-link to="/table">表格</router-link>
        </a-menu-item>
        <a-menu-item key="1">
          <router-link to="/calendar"> 日历 </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/form"> 表单 </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link to="/question"> 问卷 </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>
