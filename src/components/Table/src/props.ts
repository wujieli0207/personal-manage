import type { PropType } from 'vue'
import { BasicPaginationProps } from '/@/components/Pagination/src/types'
import type { BasicColumn } from './types/columns'

export const basicProps = {
  // 表格列
  columns: {
    type: Array as PropType<BasicColumn[]>,
    default: () => [],
  },
  // 表格标题
  title: {
    type: String,
    default: '',
  },
  // 表格标题提示
  titleHelpMessage: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  // 表格数据
  dataSource: {
    type: Array as PropType<Recordable[]>,
    default: () => [],
  },
  // 表格数据查询 api
  api: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null,
  },
  pagination: {
    type: Object as PropType<BasicPaginationProps>,
    default: () => ({}),
  },
}
