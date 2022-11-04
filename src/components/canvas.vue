<template>
  <div id="app">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import logo from "@/assets/logo.png";
export default {
  name: "App",
  data() {
    return {
      cxt: null,
      canvas: null,
    };
  },
  mounted() {
    this.canvas = document.querySelector("#canvas");
    this.cxt = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    const img = new Image();
    img.src = logo;
    img.onload = () => {
      this.draw(img);
    };
  },
  methods: {
    draw(img) {
      this.cxt.drawImage(img, 0, 0);
      const imgData = this.cxt.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      for (let i = 0; i < imgData.width; i++) {
        for (let j = 0; j < imgData.height; j++) {
          // 每行第一个像素点
          const r = (j * imgData.width + i) * 4;
          const R = imgData.data[r];
          const G = imgData.data[r + 1];
          const B = imgData.data[r + 2];
          const A = imgData.data[r + 3];
          // console.log(R,G,B,A)
          if (R == 65 && G == 184 && B == 131 && A == 255) {
            imgData.data[r] = 255;
            imgData.data[r + 1] = 0;
            imgData.data[r + 2] = 0;
            imgData.data[r + 3] = 255;
          }
        }
      }
      setTimeout(() => {
        this.cxt.putImageData(imgData, 0, 0);
      }, 2000);
    },
  },
};
</script>

<style></style>
