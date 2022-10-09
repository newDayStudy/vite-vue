<script setup>
import { getTopic } from "@/apis";
import { onMounted, ref, shallowRef, toRaw } from "vue";
import { CheckboxGroup, RadioGroup } from "ant-design-vue";
const componentsMap = new Map();
componentsMap.set("0", shallowRef(CheckboxGroup));
componentsMap.set("1", shallowRef(RadioGroup));
const data = ref([]);

const getTopic_ = async () => {
  const res = await getTopic();
  if (res.code == 200) {
    data.value = res.data.map((item) => {
      item.children = item.children.map((ans) => {
        ans.label = ans.title;
        ans.value = ans.id;
        return ans;
      });
      item.comName = componentsMap.get(item.type);
      return item;
    });
  }
};
onMounted(getTopic_);

const onsubmit = () => {
  const res = data.value
    .filter((item) => item.checked)
    .map((item) => {
      return {
        question_id: item.id,
        answer_id: toRaw(item.checked),
      };
    });
  console.log("选择的结果", res);
};
</script>

<template>
  <a-layout class="a-layout">
    <a-card>
      <h3 class="title">
        移动支付时代下大学生群体消费活动中免密支付使用情况调查
      </h3>
      <div v-for="(item, index) in data" :key="item.id" class="q-item">
        <div class="q-title">
          <span class="number">{{ index + 1 }}、</span>
          <span>{{ item.title }}</span>
        </div>
        <div class="q-content">
          <component
            :is="item.comName"
            v-model:value="item.checked"
            :options="item.children"
          ></component>
        </div>
      </div>
      <div class="btn">
        <a-button type="primary" @click="onsubmit">提交</a-button>
      </div>
    </a-card>
  </a-layout>
</template>

<style lang="scss" scoped>
.a-layout {
  overflow-y: auto;
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  h3.title {
    margin-bottom: 30px;
    text-align: center;
  }
  .q-item {
    margin-bottom: 30px;
    .q-title {
      display: flex;
      margin-bottom: 4px;
      .number {
        width: 30px;
        text-align: right;
      }
    }
    .q-content {
      margin-left: 25px;
      .ant-checkbox-group-item,
      .ant-radio-wrapper {
        display: flex;
        margin-bottom: 4px;
      }
    }
  }
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
