<script setup>
import Layout from '@/components/Layout';
</script>
<template>
  <Layout
  :is-show-top-img="true"
  >
    <div class="activity-list">
      <router-link to="/activityRules">
        <img src="/images/a01.png"/>
      </router-link>
      <router-link to="/startRace">
        <img src="/images/a02.png"/>
      </router-link>
      <router-link to="/raceRank">
        <img src="/images/a03.png" class="last-child"/>
      </router-link> 
    </div>
  </Layout>
</template>
<style lang="scss" scoped>
.activity-list{
  display:flex;
  flex-direction: column;
  padding-top: 58px;
  img{
    width: 347px;
    height: 87px;
    margin-bottom: 40px;
    .last-child{
      margin-bottom:0;
    }
  }
}
</style>