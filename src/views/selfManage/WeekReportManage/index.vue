<template>
  <el-card>
    <basic-table
      :data="tableData"
      :columns="columns"
      :show-paging="true"
      :pagination="{
        currentPage: 1,
        pageSize: 10,
        total: tableData.length,
      }"
      @pagingChange="handlePagingChange"
    >
      <template #action="scope">
        <el-button
          type="text"
          size="small"
          @click="handleClick('edit', scope.data)"
          >编辑</el-button
        >
        <el-divider direction="vertical" />
        <el-button
          type="text"
          size="small"
          class="text-red-500"
          @click="handleClick('delete', scope.data)"
          >删除</el-button
        >
      </template>
    </basic-table>
  </el-card>
</template>

<script lang="ts" setup>
import { BasicTable } from "/@/components/Table";
import type { PagingChangingOption } from "/@/components/Pagination/src/types";
import { ColumnProps } from "/@/components/Table/src/types/columns";
import { WeekReportList } from "/@/api/model/weekReportModel";
import { onMounted, Ref, ref } from "vue";
import { getWeekReportApi } from "/@/api/weekReport";

onMounted(() => {
  loadWeekReport();
});

const tableData: Ref<Array<WeekReportList>> = ref([]);

const columns: Array<ColumnProps> = [
  {
    prop: "id",
    label: "ID",
  },
  {
    prop: "title",
    label: "周总结标题",
  },
  {
    prop: "workDayPomo",
    label: "工作日番茄钟学习数",
    align: "center",
  },
  {
    prop: "restDayPomo",
    label: "休息日番茄钟学习数",
    align: "center",
  },
  {
    prop: "workoutTimes",
    label: "本周健身次数",
    align: "center",
  },
  {
    prop: "averageSleepHour",
    label: "平均睡眠时长(小时)",
    align: "center",
  },
  {
    prop: "startDate",
    label: "开始时间",
    align: "center",
  },
  {
    prop: "endDate",
    label: "结束时间",
    align: "center",
  },
  {
    prop: "",
    label: "操作",
    slots: { body: "action" },
    fixed: "right",
  },
];

/**
 *
 * @description 加载表格数据
 */
async function loadWeekReport() {
  const result = await getWeekReportApi(2022);
  console.log("result: ", result);
  tableData.value = result;
}
/**
 *
 * @description 处理点击事件操作
 */
function handleClick(type: string, scope: unknown) {
  console.log("type: ", type);
  console.log("scope: ", scope);
}

/**
 * @description 处理翻页操作
 */
function handlePagingChange(option: PagingChangingOption) {
  console.log("option: ", option);
}
</script>
