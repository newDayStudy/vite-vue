<script setup>
import Layout from '@/components/Layout';
import {useRouter} from 'vue-router';
const router = useRouter()
const goBack = () => {
  console.log(11111)
  router.go(-1)
}
</script>
<template>
  <Layout
  :is-show-top-img="true"
  >
    <img src="/images/gz.png" class="rule-img"/>
    <img src="/images/back.png" class="back-img" @click="goBack"/>
  </Layout>
</template>
<style lang="scss" scoped>
  .rule-img{
    width: 80%;
    margin-bottom: 40px;
  }
  .back-img{
    width: 180px;
	  height: 45px;
  }
</style>