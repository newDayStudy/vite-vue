<script setup>
import { ref } from "vue";
import Calendar from "@/components/calender";
import { getDateObj, zeroFill } from "../components/calender/utils";

const onCalendar = (dayObj) => {
  console.log(dayObj);
};
const { year, month, day } = getDateObj();
const date = ref(year + "-" + zeroFill(month) + "-" + zeroFill(day));
</script>

<template>
  <a-layout class="a-layout">
    <a-card>
      <a-date-picker
        v-model:value="date"
        picker="month"
        value-format="YYYY-MM-DD"
        class="a-date-picker"
      />
      <Calendar v-model:date="date" @click="onCalendar" />
    </a-card>
  </a-layout>
</template>

<style lang="scss" scoped>
.a-layout {
  overflow-y: auto;
  box-sizing: border-box;
  height: 100%;
  padding: 30px;
  .a-date-picker {
    margin-bottom: 10px;
  }
}
</style>
