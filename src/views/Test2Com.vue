<script setup>
import { getCurrentInstance, onMounted } from "vue";
import { getIp } from "@/apis";
const charts = getCurrentInstance().appContext.config.globalProperties.$charts;
const getIpList = async () => {
  try {
    const res = await getIp();
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
onMounted(async () => {
  const data = await getIpList();
  const date = Array.from(new Set(data.map((item) => item.create_time)));
  const path = Array.from(new Set(data.map((item) => item.pathname)));
  const ip = Array.from(new Set(data.map((item) => item.ip)));
  // console.log(ip)
  const chart = charts.init(document.getElementById("chart1"));
  // const chart1 = charts.init(document.getElementById('chart2'))
  const series = path.map((p) => {
    const dataArr = date.map((d) => {
      const dd = data.filter((item) => item.create_time == d);
      const length = dd.filter((ddd) => ddd.pathname == p).length;
      return length;
    });
    return {
      name: p,
      type: "line",
      data: dataArr,
    };
  });
  chart.setOption({
    title: {
      text: "不同时间段菜单访问次数",
    },
    grid: {
      left: 25,
      right: 20,
      top: 50,
      bottom: 20,
    },
    tooltip: {
      trigger: "axis",
      confine: true,
    },
    xAxis: {
      type: "category",
      data: date,
    },
    yAxis: {
      type: "value",
    },
    series,
  });
});
</script>

<template>
  <a-layout class="a-layout">
    <a-row :gutter="[20, 20]">
      <a-col span="12">
        <a-card>
          <div id="chart1"></div>
        </a-card>
      </a-col>
      <a-col span="12">
        <a-card>
          <div id="chart2"></div>
        </a-card>
      </a-col>
    </a-row>
  </a-layout>
</template>

<style lang="scss" scoped>
.a-layout {
  overflow-y: auto;
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
}
#chart1,
#chart2 {
  width: 100%;
  height: 300px;
}
</style>
