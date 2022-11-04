<script setup>
import TestPropsVue from "./components/TestProps.vue";
</script>

<template>
  <a-layout class="a-layout">
    <a-card>
      <TestPropsVue name />
    </a-card>
  </a-layout>
</template>

<style lang="scss" scoped>
.a-layout {
  overflow-y: auto;
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
}
</style>
