<template>
  <div>
    <table-title :title="title" :help-message="titleHelpMessage" class=""></table-title>

    <el-table ref="tableElRef" v-bind="getBindValues" stripe table-layout="auto">
      <template v-for="column in getViewColumns" :key="column.prop">
        <el-table-column v-if="column.slots" v-bind="column">
          <template #header>
            <slot :name="column.slots?.header">{{ column.label || '自定义 Header' }}</slot>
            <basic-help v-if="column.helpMessage" :content="column.helpMessage" />
          </template>
          <template #default="{ row }">
            <slot :name="column.slots?.body" :data="row">{{
              row[column.prop] || '需要自定义'
            }}</slot>
          </template>
        </el-table-column>

        <el-table-column v-else v-bind="column">
          <template #header>
            {{ column.label }}
            <basic-help v-if="column.helpMessage" :content="column.helpMessage" />
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- 分页 -->
    <div v-if="isShowPaging" class="float-right h-full my-4">
      <basic-pagination :pagination="getPaginationInfo" @paging-change="handlePagingChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, toRaw, unref, useAttrs } from 'vue'
  import TableTitle from './components/TableTitle.vue'
  import { BasicHelp } from '/@/components/Basic'
  import { BasicPagination } from '/@/components/Pagination'
  import { basicProps } from './props'
  import { BasicTableProps } from './types/table'
  import { useColumns } from './hooks/useColumns'
  import { useTableHeader } from './hooks/useTableHeader'
  import { useDataSource } from './hooks/useDataSource'
  import { usePagination } from './hooks/usePagination'
  import type { PagingChangingOption } from '/@/components/Pagination/src/types'

  const props = defineProps(basicProps)
  const emits = defineEmits(['pagingChange'])
  const attrs = useAttrs()

  const tableElRef = ref(null)

  const getProps = computed(() => {
    return { ...props } as BasicTableProps
  })

  const { getViewColumns } = useColumns(getProps)

  const { getHeaderProps } = useTableHeader(getProps)

  const { getDataSourceRef } = useDataSource(getProps)

  const { getPaginationInfo, getShowPagination } = usePagination(getProps)

  const isShowPaging = getShowPagination()

  const getBindValues = computed(() => {
    let propsData: Recordable = {
      ...attrs,
      ...unref(getProps),
      ...unref(getHeaderProps),
      columns: toRaw(unref(getViewColumns)),
      data: unref(getDataSourceRef),
    }

    return propsData
  })

  /**
   * @description 分页数据改变监听函数
   */
  function handlePagingChange(option: PagingChangingOption) {
    emits('pagingChange', option)
  }
</script>
