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
        <el-popconfirm
          title="是否确认删除?"
          @confirm="handleClick('delete', scope.data)"
        >
          <template #reference>
            <el-button type="text" size="small" class="text-red-500"
              >删除</el-button
            >
          </template>
        </el-popconfirm>
      </template>
    </basic-table>

    <edit-week-report-form
      :form-data="EditWeekReportData"
      v-model:is-dialog-show="isDialogShow"
      dialog-title="编辑每周统计数据"
      v-model:is-submit-success="submitResult"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted, reactive, Ref, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";
import { BasicTable } from "/@/components/Table";
import EditWeekReportForm from "./components/EditWeekReportForm.vue";
import { WeekReport } from "/@/api/model/weekReportModel";
import { ColumnProps } from "/@/components/Table/src/types/columns";
import {
  getWeekReportByIdApi,
  getWeekReportByYearApi,
  removeWeekReportApi,
} from "/@/api/weekReport";
import { PagingChangingOption } from "/@/components/Pagination/src/types";

onMounted(() => {
  loadWeekReport();
});

const isDialogShow = ref(false);
const EditWeekReportData = ref({}) as Ref<WeekReport>;
const submitResult = ref(null);

const currentYear = ref(2022);

const tableData: Ref<Array<WeekReport>> = ref([]);
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

// TODO 对于提交数据后刷新表格，目前还没有特别好的的处理方案，
// 暂时使用监听 isDialogShow 实现，但是在没有修改数据时会多一次请求数据
watch(isDialogShow, (newValue, oldValue) => {
  if (newValue !== oldValue && newValue === false) {
    loadWeekReport();
  }
});

/**
 *
 * @description 加载表格数据
 */
async function loadWeekReport() {
  const result = await getWeekReportByYearApi({
    year: currentYear.value,
    currentPage: tablePagination.currentPage,
    pageSize: tablePagination.pageSize,
  });
  tableData.value = result.list;
  tablePagination.total = result.count;
}
/**
 *
 * @description 处理点击事件操作
 */
async function handleClick(type: string, scope: WeekReport) {
  if (type === "edit") {
    isDialogShow.value = true;
    console.log("isDialogShow.value: ", isDialogShow.value);
    EditWeekReportData.value = await getWeekReportByIdApi(scope.id);
  }
  if (type === "delete") {
    const result = await removeWeekReportApi(scope.id);
    if (result.id === scope.id) {
      ElMessage({
        message: "删除成功！",
        type: "success",
      });
      loadWeekReport();
    }
  }
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
  loadWeekReport();
}
</script>
