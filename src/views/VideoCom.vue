<script setup>
import { onMounted, h, ref } from "vue";
import dayjs from "dayjs";
const validRange = ref([dayjs().startOf("month"), dayjs().endOf("month")]);
const dateFullCellRender = ({ current }) => {
  const cur = dayjs(current).format("YYYYMMDD");
  const start = dayjs().startOf("month").format("YYYYMMDD");
  const end = dayjs().endOf("month").format("YYYYMMDD");
  if (cur >= start && cur <= end) {
    return h(
      "span",
      {
        style: {
          display: "block",
          height: "50px",
        },
      },
      dayjs(cur).format("D")
    );
  }
};
const onSelect = (date) => {
  alert("选中的日期=" + date);
};

onMounted(() => {});
</script>

<template>
  <a-layout class="a-layout">
    <a-card>
      <a-calendar
        :date-full-cell-render="dateFullCellRender"
        :valid-range="validRange"
        value-format="YYYY-MM-DD"
        @select="onSelect"
      >
        <template #headerRender></template>
      </a-calendar>
    </a-card>
  </a-layout>
</template>

<style lang="scss" scoped>
.a-layout {
  overflow-y: auto;
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
}
</style>
