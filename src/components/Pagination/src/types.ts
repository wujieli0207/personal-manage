import { PaginationProps } from 'element-plus'

export interface PagingChangingOption {
  type: 'currentPage' | 'pageSize'
  val: number
}

export type BasicPaginationProps = Partial<Mutable<PaginationProps>>
