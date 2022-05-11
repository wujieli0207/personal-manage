<template>
  <el-card>
    <basic-table
      :data="tableData"
      :columns="columns"
      :show-paging="true"
      :pagination="{
        currentPage: tablePagination.currentPage,
        pageSize: tablePagination.pageSize,
        total: tablePagination.total,
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
import {
  GetWeekReportParams,
  WeekReportList,
} from "/@/api/model/weekReportModel";
import { onMounted, reactive, Ref, ref } from "vue";
import { getWeekReportApi } from "/@/api/weekReport";

onMounted(() => {
  loadWeekReport({
    year: currentYear.value,
    currentPage: tablePagination.currentPage,
    pageSize: tablePagination.pageSize,
  });
});

const currentYear = ref(2022);

const tableData: Ref<Array<WeekReportList>> = ref([]);
const tablePagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});

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
async function loadWeekReport(params: GetWeekReportParams) {
  const result = await getWeekReportApi(params);
  tableData.value = result.list;
  tablePagination.total = result.count;
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
  if (option.type === "pageSize") {
    tablePagination.pageSize = option.val;
  }
  if (option.type === "currentPage") {
    tablePagination.currentPage = option.val;
  }
  loadWeekReport({
    year: currentYear.value,
    currentPage: tablePagination.currentPage,
    pageSize: tablePagination.pageSize,
  });
}
</script>
