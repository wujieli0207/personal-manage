import { BuildPropType } from 'element-plus/lib/utils'

export interface ExceptionMapValue {
  title: string
  subTitle: string
  icon?: BuildPropType<unknown, 'info' | 'success' | 'warning' | 'error', unknown> | undefined
  btnText?: string
  handler?: Fn
  status?: string
}
