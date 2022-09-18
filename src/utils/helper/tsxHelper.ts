import { Slots } from 'vue'
import { isFunction } from '../is'

/**
 * @description:  获取插槽内容
 */
export function getSlot(slots: Slots, slot = 'default', data?: any) {
  if (!slots || !Reflect.has(slots, slot)) {
    return null
  }

  if (!isFunction(slots[slot])) {
    console.error(`${slot} is not a function!`)
    return null
  }

  const slotFn = slots[slot]

  if (!slotFn) return null

  return slotFn(data)
}
