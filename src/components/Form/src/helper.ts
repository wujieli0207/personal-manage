import { ComponentType } from './types'

/**
 *
 * @description 创建 placeholder 提示文字
 */
export function createPlaceholderMessage(component: ComponentType): string {
  const placeholderObj: Record<string, string> = {
    Input: '请输入',
    Select: '请选择',
    Checkbox: '请选择',
    Radio: '请选择',
    Switch: '请选择',
  }

  return placeholderObj[component] ?? ''
}
