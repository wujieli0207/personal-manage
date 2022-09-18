import { useDebounceFn, useThrottleFn } from '@vueuse/core'
import { unref } from 'vue'
import { ref, Ref, watch } from 'vue'

export type RemoveEventFn = () => void

export interface UseEventParams {
  el?: Element | Ref<Element | undefined> | Window
  name: string
  listener: EventListener
  options?: boolean | AddEventListenerOptions
  autoRemove?: boolean
  isDebounce?: boolean
  wait?: number
}

export function useEventListener({
  el = window,
  name,
  listener,
  options,
  autoRemove = true,
  isDebounce = true,
  wait = 80,
}: UseEventParams): { removeEvent: RemoveEventFn } {
  let remove: RemoveEventFn = () => ({})
  const isAddRef = ref(false)

  if (!el) return { removeEvent: remove }

  const element = ref(el as Element)

  const handler = isDebounce ? useDebounceFn(listener, wait) : useThrottleFn(listener, wait)

  const realHandler = wait ? handler : listener
  const removeEventLIstener = (e: Element) => {
    isAddRef.value = true
    e.removeEventListener(name, realHandler, options)
  }
  const addEventListener = (e: Element) => e.addEventListener(name, realHandler, options)

  const removeWatch = watch(
    element,
    (v, ov, cleanUp) => {
      !unref(isAddRef) && addEventListener(v)
      cleanUp(() => {
        autoRemove && removeEventLIstener(v)
      })
    },
    { immediate: true }
  )

  remove = () => {
    removeEventLIstener(element.value)
    removeWatch()
  }

  return { removeEvent: remove }
}
