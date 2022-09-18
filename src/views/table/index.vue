<template>
  <basic-table
    title="基础表格"
    title-help-message="表格标题实例"
    :columns="columns"
    :data-source="data"
  ></basic-table>
</template>

<script lang="ts" setup>
  import { BasicTable } from '/@/components/Table'
  import { getBasicColumns, getBasicData } from './hooks/tableData'

  const columns = getBasicColumns()

  const data = getBasicData()
</script>
