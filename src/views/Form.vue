<script setup>
import Layout from '@/components/Layout';
import { useRouter } from 'vue-router'
const router = useRouter()
const submit = () => {
  router.push('/activity')
}
</script>
<template>
  <Layout
  :is-show-top-img="true"
  >
    <p>目前报名人数:xxx</p>
    <form>
      <input placeholder="输入您的姓名全称"/>
      <input placeholder="输入您所在的医院"/>
      <input placeholder="输入您的职位"/>
      <input placeholder="输入您的手机号"/>
      <input placeholder="输入您所在的城市"/>
      <img src="/images/tj.png" class="btn" @click="submit"/>
    </form>
  </Layout>
</template>
<style lang="scss" scoped>
  p{
    overflow:hidden;
    max-width: 400px;
    padding: 0 40px;
    margin-bottom: 45px;
    line-height: 34px;
    font-size: 23px;
    font-weight:bold;
    background-image: url('/images/number.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    text-align:center;
    text-overflow:ellipsis;
    white-space: nowrap;
    color: #1c83e8;
  }
  form{
    display:flex;
    flex-direction: column;
    align-items:center;
    .btn{
      width: 180px;
      height: 45px;
      margin-top: 10px;
    }
    input{
      margin-bottom: 19px;
      padding: 0 10px;
      height:56px;
      border: 1px solid #1c83e8;
      border-radius: 8px;
    }
    input::-webkit-input-placeholder{
      font-size: 24px;
      color:  #c0c0c0;
      opacity: 0.7;
      text-align: center;
    }
  }
</style>