import { BasicColumn } from '../types/columns'
import { cloneDeep } from 'lodash-es'
import { computed, Ref, ref, toRaw, unref } from 'vue'
import { ComputedRef } from 'vue'
import { BasicTableProps, GetColumnsParams } from '../types/table'
import { FixedDir } from 'element-plus/lib/components/table-v2/src/constants'

/**
 *
 * @description 处理列居左、居右（默认居中）
 */
function sortFixedColumn(columns: BasicColumn[]) {
  const fixedLeftColumns: BasicColumn[] = []
  const fixedRightColumns: BasicColumn[] = []
  const defColumns: BasicColumn[] = []

  for (const column of columns) {
    if (column.fixed === FixedDir.LEFT) {
      fixedLeftColumns.push(column)
      continue
    }
    if (column.fixed === FixedDir.RIGHT) {
      fixedRightColumns.push(column)
      continue
    }
    defColumns.push(column)
  }

  return [...fixedLeftColumns, ...defColumns, ...fixedRightColumns].filter((item) => !item.hidden)
}

export function useColumns(propsRef: ComputedRef<BasicTableProps>) {
  const columnsRef = ref(unref(propsRef).columns) as unknown as Ref<BasicColumn[]>
  const getColumnsRef = computed(() => {
    const columns = cloneDeep(unref(columnsRef))

    if (!columns) return []

    return columns
  })
  const getViewColumns = computed(() => {
    const viewColumns = sortFixedColumn(unref(getColumnsRef))

    const columns = cloneDeep(viewColumns)

    return columns.map((column) => {
      const { slots } = column

      if (!slots || !slots?.label) {
        column.customLabel = column.label
      }

      return column
    })
  })

  function getColumns(opt?: GetColumnsParams) {
    const { sort } = opt ?? {}
    let columns = toRaw(unref(getColumnsRef))

    if (sort) {
      columns = sortFixedColumn(columns)
    }

    return columns
  }

  return {
    columnsRef,
    getViewColumns,
    getColumns,
  }
}
