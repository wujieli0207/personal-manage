import { Column } from 'element-plus'
import { VueNode } from '/@/utils/propTypes'

export interface BasicColumn extends Omit<Column<Recordable>, 'width'> {
  slots?: Recordable
  // 字段名称
  prop: string
  // 字典展示标签
  label: string
  minWidth: number | string
  align: string
  customLabel?: VueNode
  helpMessage?: string | string[]
  dataIndex?: string
  width?: number
}
