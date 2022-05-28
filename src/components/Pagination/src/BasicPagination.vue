<template>
  <el-pagination
    background
    :layout="layout"
    :page-sizes="pageSizes"
    :total="pagination.total"
    :page-size="pagination.pageSize"
    :current-page="pagination.currentPage"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  />
</template>

<script lang="ts" setup>
  import { PropType } from "vue";

  defineProps({
    // 分页信息
    pagination: {
      type: Object,
      default: () => {
        return {
          currentPage: 1,
          pageSize: 10,
          total: 100,
        };
      },
    },
    // 展示按钮
    layout: {
      type: String,
      default: "sizes, prev, pager, next, jumper, ->, total",
    },
    // 每页显示个数选择器的选项设置
    pageSizes: {
      type: Array as PropType<Array<number>>,
      default: () => [10, 20, 50],
    },
  });

  const emits = defineEmits(["pagingChange"]);

  function handleCurrentChange(currentPage: number): void {
    emits("pagingChange", { type: "currentPage", val: currentPage });
  }

  function handleSizeChange(pageSize: number): void {
    emits("pagingChange", { type: "pageSize", val: pageSize });
  }
</script>
