<template>
  <div>
    <el-card class="mb-4">
      <el-row>
        <el-col>
          <el-select v-model="reportYear" @change="loadWeekReport">
            <el-option
              v-for="year in yearRange"
              :key="year"
              :label="`${year}年`"
              :value="year"
            />
          </el-select>
        </el-col>
      </el-row>
    </el-card>
    <el-row class="mb-6" :gutter="10">
      <el-col :span="12">
        <work-day-pomo :x-data="xData" :y-data="yData.workDayPomoData" />
      </el-col>
      <el-col :span="12">
        <rest-day-pomo :x-data="xData" :y-data="yData.restDayPomoData" />
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <workout-times :x-data="xData" :y-data="yData.workoutTimesData" />
      </el-col>
      <el-col :span="12">
        <sleep-hour :x-data="xData" :y-data="yData.sleepHourData" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, Ref, ref } from "vue";
import { getWeekReportApi } from "/@/api/weekReport";
import WorkDayPomo from "./components/WorkDayPomo.vue";
import RestDayPomo from "./components/RestDayPomo.vue";
import WorkoutTimes from "./components/Workout.vue";
import SleepHour from "./components/SleepHour.vue";
import { WeekReportYData } from "./types";

// 周总结数据查询年份，默当前年份
const reportYear = ref(new Date().getFullYear());
const yearRange = computed(() => {
  return [
    reportYear.value + 2,
    reportYear.value + 1,
    reportYear.value,
    reportYear.value - 1,
    reportYear.value - 2,
  ];
});

const xData: Ref<Array<string>> = ref([]);

const yData: WeekReportYData = reactive({
  workDayPomoData: [],
  restDayPomoData: [],
  workoutTimesData: [],
  sleepHourData: [],
});

async function loadWeekReport() {
  // 重新加载前数据清空
  if (xData.value.length !== 0) {
    xData.value = [];
    yData.workDayPomoData = [];
    yData.restDayPomoData = [];
    yData.workoutTimesData = [];
    yData.sleepHourData = [];
  }

  const result = await getWeekReportApi(reportYear.value);

  result
    .sort((a, b) => a.id - b.id)
    .forEach((item) => {
      // x 轴数据
      xData.value.push(item.title);

      // y 轴数据
      yData.workDayPomoData.push(item.workDayPomo);
      yData.restDayPomoData.push(item.restDayPomo);
      yData.workoutTimesData.push(item.workoutTimes);
      yData.sleepHourData.push(parseFloat(item.averageSleepHour));
    });
}

onMounted(() => {
  loadWeekReport();
});
</script>
