<script setup></script>

<template>
  <a-layout class="a-layout">
    <a-card>
      <a-list bordered>
        <a-list-item>
          <router-link to="/table">表格</router-link>
        </a-list-item>
        <a-list-item>
          <router-link to="/calendar"> 日历 </router-link>
        </a-list-item>
      </a-list>
    </a-card>
  </a-layout>
</template>

<style lang="scss" scoped>
.a-layout {
  overflow-y: auto;
  box-sizing: border-box;
  height: 100%;
  padding: 30px;
}
</style>
