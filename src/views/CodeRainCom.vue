<script setup>
import { ref, onMounted } from "vue";
const canvas = ref(null);
console.log(canvas);

const draw = () => {
  const width = document.getElementById("canvas").width;
  const height = document.getElementById("canvas").height;
  const ctx = canvas.value.getContext("2d");
  const arr = Array(Math.ceil(width / 10)).fill(0);
  const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

  function rain() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#0f0";
    arr.forEach((value, index) => {
      ctx.fillText(
        str[Math.floor(Math.random() * str.length)],
        index * 10,
        value + 10
      );
      arr[index] =
        value >= height || value > 8888 * Math.random() ? 0 : value + 10;
    });
  }

  setInterval(rain, 30);
};
onMounted(() => {
  draw();
  console.log(canvas.value);
});
</script>

<template>
  <a-layout class="a-layout">
    <a-card>
      <canvas id="canvas" ref="canvas"></canvas>
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

#canvas {
  width: 100%;
  height: 400px;
}
</style>
