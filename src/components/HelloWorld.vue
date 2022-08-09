<script setup>
import { ref, defineProps } from "vue";

defineProps({
  msg: {
    type: String,
    default: "hello world Vite",
  },
});

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>
  <h1>{{ count }}</h1>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
