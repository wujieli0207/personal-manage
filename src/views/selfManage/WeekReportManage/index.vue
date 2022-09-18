<template>
  <div>
    <!-- 查询条件 -->
    <el-card class="mb-4">
      <el-form :inline="true">
        <el-form-item class="mb-0" label="查询年份: ">
          <el-select v-model="currentYear">
            <el-option v-for="year in yearRange" :key="year" :label="`${year}年`" :value="year" />
          </el-select>
        </el-form-item>

        <el-form-item class="mb-0">
          <el-button type="primary" @click="loadWeekReport">查询</el-button>
        </el-form-item>
        <el-form-item class="mb-0">
          <el-button type="primary" @click="handleClick(EditType.CREATE)">新增</el-button>
        </el-form-item>
        <el-form-item class="mb-0" @click="handleExport">
          <el-button type="primary">导出</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 基础表格 -->
    <el-card>
      <basic-table
        :title="`${currentYear}年统计数据`"
        title-help-message="按照每周维度统计"
        :data-source="tableData"
        :columns="columns"
        :pagination="tablePagination"
        @paging-change="handlePagingChange"
      >
        <template #action="scope">
          <el-button
            text
            type="primary"
            size="small"
            @click="handleClick(EditType.UPDATE, scope.data)"
            >编辑</el-button
          >
          <el-divider direction="vertical" />
          <el-popconfirm title="是否确认删除?" @confirm="handleClick(EditType.DELETE, scope.data)">
            <template #reference>
              <el-button text type="danger" size="small" class="text-red-500">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </basic-table>

      <edit-week-report-form
        v-model:is-dialog-show="isDialogShow"
        :form-data="editWeekReportData"
        :edit-type="editType"
        dialog-title="编辑每周统计数据"
      />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, Ref, ref, watch } from 'vue'
  import { BasicTable } from '/@/components/Table'
  import EditWeekReportForm from './components/EditWeekReportForm.vue'
  import { WeekReport } from '/@/api/model/weekReportModel'
  import { BasicColumn } from '/@/components/Table/src/types/columns'
  import {
    getWeekReportByIdApi,
    getWeekReportByYearApi,
    removeWeekReportApi,
  } from '/@/api/weekReport'
  import { BasicPaginationProps, PagingChangingOption } from '/@/components/Pagination/src/types'
  import { EditType } from '/@/enums/appEnum'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { jsonToSheetXlsx } from '/@/components/Excel/src/export2Excel'
  import { FixedDir } from 'element-plus/es/components/table-v2/src/constants'

  const { createMessage } = useMessage()

  onMounted(() => {
    loadWeekReport()
  })

  const isDialogShow = ref(false)
  const editWeekReportData = ref({}) as Ref<WeekReport>
  const editType = ref() as Ref<EditType>

  const currentYear = ref(new Date().getFullYear())
  const yearRange = computed(() => {
    return [
      currentYear.value + 2,
      currentYear.value + 1,
      currentYear.value,
      currentYear.value - 1,
      currentYear.value - 2,
    ]
  })

  const tableData: Ref<Array<WeekReport>> = ref([])
  const tablePagination = ref<BasicPaginationProps>({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  })

  const columns: Array<BasicColumn> = [
    {
      prop: 'id',
      label: 'ID',
      minWidth: 60,
      align: 'center',
    },
    {
      prop: 'title',
      minWidth: 120,
      label: '周总结标题',
      align: 'center',
    },
    {
      prop: 'workDayPomo',
      label: '工作日番茄钟学习数',
      minWidth: 120,
      align: 'center',
    },
    {
      prop: 'restDayPomo',
      label: '休息日番茄钟学习数',
      minWidth: 120,
      align: 'center',
    },
    {
      prop: 'workoutTimes',
      label: '本周健身次数',
      minWidth: 120,
      align: 'center',
    },
    {
      prop: 'averageSleepHour',
      label: '平均睡眠时长(小时)',
      minWidth: 120,
      align: 'center',
    },
    {
      prop: 'startDate',
      label: '开始时间',
      minWidth: 120,
      align: 'center',
    },
    {
      prop: 'endDate',
      label: '结束时间',
      minWidth: 120,
      align: 'center',
    },
    {
      prop: '',
      label: '操作',
      slots: { body: 'action' },
      minWidth: 150,
      align: 'center',
      fixed: FixedDir.RIGHT,
    },
  ]

  // TODO 对于提交数据后刷新表格，目前还没有特别好的的处理方案，
  // 暂时使用监听 isDialogShow 实现，但是在没有修改数据时会多一次请求数据
  watch(isDialogShow, (newValue, oldValue) => {
    if (newValue !== oldValue && newValue === false) {
      loadWeekReport()
    }
  })

  /**
   *
   * @description 加载表格数据
   */
  async function loadWeekReport() {
    const result = await getWeekReportByYearApi({
      year: currentYear.value,
      currentPage: tablePagination.value?.currentPage ?? 1,
      pageSize: tablePagination.value?.pageSize ?? 10,
    })

    tableData.value = result.list
    tablePagination.value.total = result.count
  }
  /**
   *
   * @description 处理数据操作事件
   */
  async function handleClick(type: EditType, scopeData?: WeekReport) {
    if (type === EditType.CREATE) {
      isDialogShow.value = true
      editType.value = EditType.CREATE
      editWeekReportData.value = {
        id: '',
        title: '',
        workDayPomo: '',
        restDayPomo: '',
        workoutTimes: '',
        averageSleepHour: '',
        startDate: '',
        endDate: '',
      }
    }
    if (type === EditType.UPDATE && !!scopeData) {
      isDialogShow.value = true
      editType.value = EditType.UPDATE
      editWeekReportData.value = await getWeekReportByIdApi(scopeData.id)
    }
    if (type === EditType.DELETE && !!scopeData) {
      const result = await removeWeekReportApi(scopeData.id)
      if (result.id === scopeData.id) {
        createMessage.success({
          message: '删除成功！',
        })
        loadWeekReport()
      }
    }
  }

  /**
   * @description 处理翻页操作
   */
  function handlePagingChange(option: PagingChangingOption) {
    if (option.type === 'pageSize') {
      tablePagination.value.pageSize = option.val
    }
    if (option.type === 'currentPage') {
      tablePagination.value.currentPage = option.val
    }
    loadWeekReport()
  }

  /**
   * @description 处理到处当前年份全量数据
   */
  async function handleExport() {
    const result = await getWeekReportByYearApi({
      year: currentYear.value,
      currentPage: 1,
      pageSize: tablePagination.value.total!,
    })

    const tableHeader = {}
    columns.forEach((column) => {
      if (column.prop) {
        ;(tableHeader as any)[column.prop] = column.label
      }
    })

    jsonToSheetXlsx<WeekReport>({
      data: result.list,
      header: tableHeader as WeekReport,
      filename: '每周统计数据',
    })
  }
</script>
