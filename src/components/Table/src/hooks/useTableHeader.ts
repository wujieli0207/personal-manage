import { computed, ComputedRef, h, unref } from 'vue'
import TableHeader from '../components/TableHeader.vue'
import { BasicTableProps } from '../types/table'
import { isString } from '/@/utils/is'

export function useTableHeader(propsRef: ComputedRef<BasicTableProps>) {
  const { title, titleHelpMessage } = unref(propsRef)

  if (!isString(title)) {
    return {}
  }

  const getHeaderProps = computed((): Recordable => {
    return {
      title: () => h(TableHeader, { title, titleHelpMessage } as Recordable),
    }
  })
  return { getHeaderProps }
}
