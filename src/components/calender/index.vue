<script setup>
import { computed } from "vue";
import { getDate, getDay, copy, getDateObj, zeroFill } from "./utils";

const emits = defineEmits(["click"]);

const week = [
  { label: "日", value: 7 },
  { label: "一", value: 1 },
  { label: "二", value: 2 },
  { label: "三", value: 3 },
  { label: "四", value: 4 },
  { label: "五", value: 5 },
  { label: "六", value: 6 },
];

const $props = defineProps({
  date: {
    type: String,
    required: true,
    default: "2022-08-01",
  },
  success: {
    type: Array,
    default: () => ["2022-08-05", "2022-08-10"],
  },
  error: {
    type: Array,
    default: () => ["2022-08-06"],
  },
});

const days = computed(() => {
  const days = getDate($props.date);
  const week = getDay($props.date);
  const { year, month } = getDateObj($props.date);
  const dayArr = Array.from(new Array(days), (item, index) => index + 1);

  const copyArr = copy(dayArr);

  if (week <= 6) {
    for (let i = 0; i < week; i++) {
      copyArr.unshift("");
    }
  }
  return copyArr.map((item) => {
    return {
      label: item,
      value: year + "-" + zeroFill(month + 1) + "-" + zeroFill(item),
    };
  });
});

const onClickDay = (dayObj) => {
  if (dayObj.label == "") return;
  alert("你点击了" + dayObj.value);
  emits("click", dayObj);
};
</script>

<template>
  <div class="calender">
    <div class="calender-block">
      <div
        v-for="item in week"
        :key="item.value"
        class="calender-block-name week"
      >
        <slot name="head" :week="item">
          <span>{{ item.label }}</span>
        </slot>
      </div>
    </div>
    <div class="calender-block">
      <div
        v-for="(item, index) in days"
        :key="index"
        class="calender-block-name"
        :class="{
          'block-day-success': success.includes(item.value),
          'block-day-error': error.includes(item.value),
        }"
        @click="onClickDay(item)"
      >
        <slot name="content" :day="item">
          <span>{{ item.label }}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calender {
  cursor: pointer;
  &-block {
    display: flex;
    flex-wrap: wrap;
    &-name {
      box-sizing: border-box;
      width: calc(100% / 7);
      padding: 16px 14px;
      text-align: center;
      border: 1px solid #fff;
      background-color: #f2f2f2;
      &.week {
        background-color: #d7d7d7;
      }
      &.block-day-success {
        background-color: green;
        color: #fff;
      }
      &.block-day-error {
        background-color: #f00;
        color: #fff;
      }
    }
  }
}
</style>
