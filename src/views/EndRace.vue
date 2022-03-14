<script setup>
import Layout from '@/components/Layout';
</script>
<template>
  <Layout
  :is-show-top-img="true"
  >
    <div class="race-result">
      <img src="/images/df.png" class="score-img"/>
      <p class="result">
        <span>-答题得分-</span>
        <em>88分</em>
        <span>-总用时长-</span>
        <em>480s</em>
      </p>
    </div>
    <div class="btn-group">
      <router-link to="/">
        <img src="/images/jx.png"/>
      </router-link>
      <router-link to="/">
        <img src="/images/bth.png" class="back-img"/>
      </router-link>
    </div>
  </Layout>
</template>
<style lang="scss" scoped>
  .race-result{
    position: relative;
    margin-bottom: 40px;
    .result{
      position:absolute;
      top: 127px;
      left:0;
      right:0;
      display:flex;
      flex-direction: column;
      align-items:center;
      color:#ff861d;
      font-weight:bold;
      span{
        font-size: 19px;
        text-indent: 18px;
      }
      em{
        font-size: 30px;
        text-indent: 18px;
      }
    }
    .score-img{
      width:100%;
    }
  }
  .btn-group{
    img{
      width: 180px;
      height: 45px;
    }
    .back-img{
      margin-left: 24px;
    }
  }
</style>