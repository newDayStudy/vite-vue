<script setup></script>

<template>
  <a-layout class="a-layout">
    <a-layout-sider theme="light">
      <a-list bordered>
        <a-list-item>
          <router-link to="/table">表格</router-link>
        </a-list-item>
        <a-list-item>
          <router-link to="/calendar"> 日历 </router-link>
        </a-list-item>
        <a-list-item>
          <router-link to="/form"> 表单 </router-link>
        </a-list-item>
        <a-list-item>
          <router-link to="/question"> 问卷 </router-link>
        </a-list-item>
      </a-list>
    </a-layout-sider>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>
