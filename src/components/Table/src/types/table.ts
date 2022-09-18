import { VNodeChild } from 'vue'
import { BasicColumn } from './columns'
import { BasicPaginationProps } from '/@/components/Pagination/src/types'

export interface FetchParams {
  serchInfo?: Recordable
  page?: number
  sorInof?: Recordable
  filterInfo?: Recordable
}

export interface GetColumnsParams {
  sort?: boolean
}

export interface TableActionType {
  reload: (opt?: FetchParams) => Promise<void>
}

export interface BasicTableProps {
  // 接口请求数据
  api?: (...arg: any) => Promise<any>
  // 列配置
  columns?: BasicColumn[]
  // 数据
  dataSource?: Recordable[]
  // 表格标题
  title?: VNodeChild | JSX.Element | string | ((data: Recordable) => string)
  // 表格标题提示内容
  titleHelpMessage?: string | string[]
  // 分页配置
  pagination?: BasicPaginationProps
}
