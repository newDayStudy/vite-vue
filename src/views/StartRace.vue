<script setup>
import Layout from '@/components/Layout';
import {reactive, onMounted} from 'vue'
const state = reactive({
  currentStep: 1,
  isShowTopImg: false,
  steps: [
    {
      id: 1,
      title: '下列不属于抑癌基因的是：',
      type: 'radio',
      selects: [
        { id: 11, title: 'A.p53', checked: false },
        { id: 12, title: 'B.p53', checked: false },
        { id: 13, title: 'C.p53', checked: false },
        { id: 14, title: 'D.p53', checked: false }
      ],
      show: true
    },
    {
      id: 2,
      title: '下列不属于抑癌基因的是：',
      type: 'checkbox',
      selects: [
        { id: 21, title: 'A.p53', checked: false },
        { id: 22, title: 'B.p53', checked: false },
        { id: 23, title: 'C.p53', checked: false },
        { id: 24, title: 'D.p53', checked: false }
      ],
      show: false
    }
  ]
})
let stop = null, n = 2;
onMounted(() => {
  const timer = setInterval(() => {
    if (n > 0) {
      document.querySelector('.down-timer').setAttribute('src', '/images/n0' + n + '.png')
      n = n - 1
    } else {
      state.isShowTopImg = true
      clearInterval(timer)
    }
  }, 1000);
})
const nextStep = () => {
  // 先判断当前步是否有选中的
  // 然后currentStep+1
  // steps[currentStep+1].show = true 其它为false
}
</script>
<template>
  <Layout
  :is-show-top-img="state.isShowTopImg"
  >
    <img src="/images/n03.png" class="down-timer" v-if="!state.isShowTopImg"/>
    <div class="tips" v-else>
      <p class="timer">
        <span>08</span><em class="second">分</em>
        <span>00</span><em>秒</em>
      </p>
      <template v-for="(item, index) in state.steps" :key="item.id">
        <form v-if="item.show">
          <p>
            <span class="tag">{{ index + 1}}</span>
            <span>{{ item.title }}</span>
            <span>{{ item.type == 'radio' ? '单选':'多选' }}</span>
          </p>
          <label v-for="sel in item.selects" :key="sel.id">
            <input :type="item.type" name='radio'/>
            {{ sel.title}}
          </label>
        </form>
      </template>
      <img src="/images/next.png" class="btn-img" @click="nextStep"/>
    </div>
  </Layout>
</template>
<style lang="scss" scoped>
  .tips{
    display:flex;
    flex-direction: column;
    align-items:center;
  }
  p.timer{
    display:flex;
    justify-content: center;
    align-items:center;
    width: 174px;
	  height: 59px;
    margin-bottom: 45px;
    font-size: 24px;
    font-weight:bold;
    background-image: url('/images/time.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    color: #1c83e8;
    text-align:center;
    span{
      display:flex;
      align-items:center;
      justify-content: center;
      width: 35px;
      height: 35px;
      margin-right: 2px;
      color:#eb3c96;
      background-image: linear-gradient(0deg, 
        #e1e1e1 0%, 
        #ffffff 49%, 
        #e1e1e1 51%, 
        #ffffff 100%), 
      linear-gradient(
        #90949c, 
        #90949c);
      background-blend-mode: normal, 
        normal;
      box-shadow: 0px 1px 2px 0px 
        rgba(0, 0, 0, 0.45);
      border: solid 1px #ffffff
    }
    em{
      font-size: 18px;
    }
    .second{
      margin-right: 9px;
    }
  }
  form{
    position:relative;
    display:flex;
    flex-direction: column;
    margin-bottom: 40px;
    width: 433px;
    padding: 10px;
    box-shadow: 0px 0px 3px 0px rgba(106, 106, 106, 0.13);
    p{
      display:flex;
      align-items:center;
      justify-content: space-between;
      height: 68px;
      padding-left: 55px;
      padding-right: 10px;
      .tag{
        content:"";
        position: absolute;
        top:0;
        left:0;
        width: 51px;
        height: 51px;
        text-align:center;
        line-height: 51px;
        font-size: 18px;
        color:#fff;
        background-color: #4fbfe9;
        border-radius: 0px 0px 30px 0px;
      }
    }
    label{
      display:flex;
      align-items:center;
      height: 50px;
      color:#222;
      input{
        margin-right: 10px;
      }
    }
  }
  .btn-img{
    width: 180px;
    height: 45px;
  }
  .down-timer{
    width: 100%;
  }
</style>