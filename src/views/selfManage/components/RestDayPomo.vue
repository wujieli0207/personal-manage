<template>
  <el-card>
    <template #header>
      <span>周末番茄钟学习时长</span>
    </template>
    <div ref="chartRef" :style="{ width, height }"></div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted } from "vue";
import { useECharts } from "/@/hooks/web/useECharts";
import { basicProps } from "./props";

const props = defineProps({
  ...basicProps,
});

const chartRef = ref<Nullable<HTMLDivElement>>(null);

const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

onMounted(() => {
  setOptions({
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          width: 1,
          color: "#019680",
        },
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: props.xData,
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          type: "solid",
          color: "rgba(226,226,226,0.5)",
        },
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: [
      {
        type: "value",
        max: 80,
        splitNumber: 5,
        axisTick: {
          show: false,
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ["rgba(255,255,255,0.2)", "rgba(226,226,226,0.2)"],
          },
        },
      },
    ],
    grid: {
      left: "1%",
      right: "1%",
      top: "2%",
      bottom: 0,
      containLabel: true,
    },
    series: [
      {
        data: props.yData,
        type: "line",
        label: {
          show: true,
        },
      },
    ],
  });
});
</script>
