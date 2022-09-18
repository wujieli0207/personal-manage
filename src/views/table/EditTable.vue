<template>
  <basic-table title="可编辑表格" :columns="columns" :data-source="data">
    <template #action="{ scope }">
      <el-button text type="primary" size="small" @click="handleEdit(scope.data)">编辑</el-button>
      <el-button text type="danger" size="small" class="text-red-500">删除</el-button>
    </template>
  </basic-table>
</template>

<script lang="ts" setup>
  import { BasicTable } from '/@/components/Table'
  import { getEditTableColumn, getBasicData } from './hooks/tableData'

  const columns = getEditTableColumn()

  const data = getBasicData()

  function handleEdit(scopeData: unknown) {
    console.log('scopeData: ', scopeData)
  }
</script>
