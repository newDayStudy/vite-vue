<script setup>
import Layout from '@/components/Layout';
import {reactive} from 'vue'
const state = reactive({
  data:[
    {
      id: 1,
      name: 'Lily James',
      headerUrl: '/images/j01.png',
      score: 10
    },
    {
      id: 2,
      name: 'Lily James',
      headerUrl: '/images/j01.png',
      score: 10
    },
    {
      id: 3,
      name: 'Lily James',
      headerUrl: '/images/j01.png',
      score: 10
    },
    {
      id: 4,
      name: 'Lily James',
      headerUrl: '/images/j01.png',
      score: 10
    },
    {
      id: 5,
      name: 'Lily James',
      headerUrl: '/images/j01.png',
      score: 10
    },
    {
      id: 6,
      name: 'Lily James',
      headerUrl: '/images/j01.png',
      score: 10
    },
    {
      id: 7,
      name: 'Lily James',
      headerUrl: '/images/j01.png',
      score: 10
    }
  ]
})
</script>
<template>
  <Layout
  :is-show-top-img="true"
  >
    <div class="ranking">
      <div>
        <span>RANK</span>
        <em>32</em>
      </div>
      <div>
        <img src="/images/n02.png" class="avatar"/>
        <span>Alan</span>
      </div>
      <div>
        <span>STEP</span>
        <em>3540</em>
      </div>
    </div>
    <ul class="ranking-kist">
      <li v-for="(item, index) in state.data" key="item.id">
        <div>
          <img src="/images/j01.png" class="prize" v-if="index == 0"/>
          <img src="/images/j02.png" class="prize" v-if="index == 1"/>
          <img src="/images/j03.png" class="prize" v-if="index == 2"/>
          <span v-if="index > 2" class="rank">{{ index + 1}}</span>
          <img src="/images/n02.png" class="avatar"/>
          <span>Lily James</span>
        </div>
        <em>13541</em>
      </li>
    </ul>
  </Layout>
</template>
<style lang="scss" scoped>
.ranking{
  display:flex;
  align-items:center;
  width: 416px;
  height: 138px;
  margin-bottom: 30px;
  box-shadow: 0 0 2px 2px #eef3f8;
  border-radius: 2px;
  div{
    flex: 1;
    display:flex;
    align-items:center;
    flex-direction: column;
    span{
      font-size: 17px;
      color:#7676ac;
    }
    em{
      font-size: 34px;
      font-weight:bold;
    }
    .avatar{
      width: 64px;
      height: 64px;
      border-radius: 100%;
    }
  }
}
 em{
   color:#f82e1a;
 }
 
 .ranking-kist{
    width: 416px;
    display:flex;
    flex-direction: column;
    li{
      display:flex;
      align-items:center;
      justify-content: space-between;
      width:100%;
      margin-bottom: 40px;
      div{
        display:flex;
        align-items:center;
      }
    }
    .avatar{
      width: 51px;
      height: 51px;
      border-radius: 100%;
      margin-right: 10px;
    }
    .prize{
      width: 57px;
      height: 48px;
    }
    em{
      font-size: 26px;
    }
    .rank{
      width: 57px;
      text-align:center;
      font-size: 20px;
      color:#7676ac;
    }
 }
</style>