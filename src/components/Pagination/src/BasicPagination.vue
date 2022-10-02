<template>
  <el-pagination
    background
    v-bind="pagination"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  />
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { BasicPaginationProps } from './types'

defineProps({
  // 分页信息
  pagination: {
    type: Object as PropType<BasicPaginationProps>,
    default: () => ({}),
  },
})

const emits = defineEmits(['pagingChange'])

function handleCurrentChange(currentPage: number): void {
  emits('pagingChange', { type: 'currentPage', val: currentPage })
}

function handleSizeChange(pageSize: number): void {
  emits('pagingChange', { type: 'pageSize', val: pageSize })
}
</script>
