<template>
  <div>
    <el-row class="mb-6" :gutter="10">
      <el-col :span="12">
        <work-day-pomo />
      </el-col>
      <el-col :span="12">
        <week-day-pomo />
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <workout-times />
      </el-col>
      <el-col :span="12">
        <sleep-hour />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import WorkDayPomo from "./components/WorkDayPomo.vue";
import WeekDayPomo from "./components/WeekDayPomo.vue";
import WorkoutTimes from "./components/Workout.vue";
import SleepHour from "./components/SleepHour.vue";
</script>
