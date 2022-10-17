<script setup>
import { onMounted } from "vue";
onMounted(() => {
  const oUl = document.querySelector(".shape");
  // 角度初始化
  let RotateY = 0;
  let RotateX = 0;

  // 用个变量来拦截onmousemove，
  let flag = false;

  // 起点位置
  let old_x = 0;
  let old_y = 0;
  document.onmousedown = function (e) {
    flag = true;
    // 按下鼠标时，记录起点位置
    old_x = e.pageX;
    old_y = e.pageY;
  };
  document.onmousemove = function (e) {
    // 必须是按下后移动才有效果
    if (flag) {
      /**
       * 新位置减去老位置
       * 得到鼠标移动的X/Y距离
       */
      const _x = e.pageX - old_x;
      const _y = e.pageY - old_y;

      /**
       * 除以70得到需要旋转的角度
       * 除数越大，鼠标移动后旋转的角度越小，
       * 相反，除数是1，鼠标轻轻拖动，也会旋转的非常厉害
       */
      RotateY += _x / 70;
      RotateX += -(_y / 70);
      /**
       * 添加transform，盒子进行3D旋转
       */
      oUl.style.transition = "linear";
      oUl.style.transform =
        "rotateX(" + RotateX + "deg) rotateY(" + RotateY + "deg)";
    }
  };
  document.onmouseup = function () {
    flag = false;
    // 鼠标抬起时结束
  };
});
</script>

<template>
  <a-layout class="a-layout">
    <a-row gutter="12">
      <a-col span="12">
        <ul class="shape">
          <li>
            <img src="@/assets/images/th.jpg" alt="" />
          </li>
          <li><img src="@/assets/images/th1.jpg" alt="" /></li>
          <li><img src="@/assets/images/th2.jpg" alt="" /></li>
          <li><img src="@/assets/images/th3.jpg" alt="" /></li>
          <li><img src="@/assets/images/th4.jpg" alt="" /></li>
          <li><img src="@/assets/images/th5.jpg" alt="" /></li>
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
    img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
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
