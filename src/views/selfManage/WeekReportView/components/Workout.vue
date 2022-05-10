<template>
  <el-card>
    <template #header>
      <span>每周健身次数</span>
    </template>
    <div ref="chartRef" :style="{ width, height }"></div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, Ref, onMounted, watch } from "vue";
import { useECharts } from "/@/hooks/web/useECharts";
import { basicProps } from "./props";
import { isUndefined } from "lodash-es";

const props = defineProps({
  ...basicProps,
});

const chartRef = ref<Nullable<HTMLDivElement>>(null);

const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

watch(
  () => props.xData,
  (newValue, oldValue) => {
    if (newValue !== oldValue && !isUndefined(oldValue)) {
      LoadChartOptions();
    }
  },
  { immediate: true }
);

onMounted(() => {
  LoadChartOptions();
});

/**
 * @description 图表参数配置
 */
function LoadChartOptions() {
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
        max: 6,
        splitNumber: 3,
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
      left: "2%",
      right: "2%",
      top: "2%",
      bottom: 0,
      containLabel: true,
    },
    series: [
      {
        type: "bar",
        data: props.yData,
        label: {
          show: true,
          position: "top",
        },
      },
    ],
  });
}
</script>
