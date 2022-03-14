<script setup>
import { computed } from "vue";
defineProps({
  isShowTopImg: {
    type: Boolean,
    default: false
  }
});
const footerHeight = computed(() => document.querySelector("footer"));
console.log(footerHeight);
</script>
<template>
  <div class="container">
    <header>
      <div class="logo-box">
        <img src="/images/logo.png" />
      </div>
      <img src="/images/tp.png" />
      <div
        class="top-img"
        v-if="isShowTopImg"
      >
        <img src="/images/slog.png" />
  </div>
  </header>
  <div
    class="content"
    :style="{'padding-bottom': footerHeight + 'px'}"
    :class="{'content-wrapper': isShowTopImg}"
  >
    <slot></slot>
    </div>
    <footer>
      <img src="/images/bt.png" />
    </footer>
    </div>
</template>
<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  header {
    .logo-box {
      position: fixed;
      left: 20px;
      top: 0;
      right: 0;
      z-index: 33;
      padding-right: 20px;
    }
    img {
      width: 100%;
    }
    .top-img {
      position: absolute;
      top: 111px;
      left: 0;
      img {
        margin-left: -20px;
      }
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 2;
  }
  .content-wrapper {
    padding-top: 110px;
  }
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    img {
      width: 100%;
    }
  }
}
</style>