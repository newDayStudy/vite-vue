<script setup>
import { onMounted } from "vue";
onMounted(() => {
  const oUl = document.querySelector(".shape");
  document.addEventListener("mouseover", (e) => {
    // oUl.style.transform = `rotateX(${e.layerX}deg) rotateY(${e.layerY}deg)`
  });
});
</script>

<template>
  <a-layout class="a-layout">
    <a-row gutter="12">
      <a-col span="12">
        <ul class="shape">
          <li>前</li>
          <li>后</li>
          <li>左</li>
          <li>右</li>
          <li>上</li>
          <li>下</li>
        </ul>
      </a-col>
      <a-col span="12">
        <ul class="shape shape1">
          <li>前</li>
          <li>后</li>
          <li>左</li>
          <li>右</li>
          <li>上</li>
          <li>下</li>
        </ul>
      </a-col>
    </a-row>
  </a-layout>
</template>

<style lang="scss" scoped>
.a-layout {
  overflow-y: auto;
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  perspective: 500px;
}
$colors: red, green, blue, black, gray, #00ffac;
ul {
  position: relative;
  top: 100px;
  left: 200px;
  transform-style: preserve-3d;
  list-style: none;
  width: 100px;
  height: 100px;
  transition: 1s;
  transform-origin: center;
  transform: rotateX(-45deg) rotateY(40deg);
  li {
    position: absolute;
    width: 100px;
    height: 100px;
    text-align: center;
    color: #fff;
    line-height: 100px;
    @for $i from 1 through 6 {
      &:nth-child(#{$i}) {
        background-color: nth($colors, $i);
      }
    }
    &:nth-child(1) {
      transform: translateZ(50px);
    }
    &:nth-child(2) {
      transform: translateZ(-50px) rotateY(180deg);
    }
    &:nth-child(3) {
      transform: translateX(-50px) rotateY(-90deg);
    }
    &:nth-child(4) {
      transform: translateX(50px) rotateY(90deg);
    }
    &:nth-child(5) {
      transform: translateY(-50px) rotateX(90deg);
    }
    &:nth-child(6) {
      transform: translateY(50px) rotateX(90deg);
    }
  }
  &.shape1 {
    height: 200px;
    li {
      height: 200px;
      &:nth-child(2) {
        height: 200px;
      }
      &:nth-child(5) {
        height: 100px;
      }
      &:nth-child(6) {
        height: 100px;
        transform: translateY(150px) rotateX(90deg);
      }
    }
  }
}
</style>
