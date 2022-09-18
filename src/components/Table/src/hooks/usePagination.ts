import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZES } from '../const'
import { computed, ComputedRef, ref, unref } from 'vue'
import { BasicTableProps } from '../types/table'
import { BasicPaginationProps } from '/@/components/Pagination/src/types'

export function usePagination(propsRef: ComputedRef<BasicTableProps>) {
  const isShow = ref(true)

  const getPaginationInfo = computed((): BasicPaginationProps => {
    const { pagination } = unref(propsRef)

    if (!pagination) {
      isShow.value = false
      return {} as BasicPaginationProps
    }

    return {
      ...pagination,
      pageSize: pagination.pageSize ?? DEFAULT_PAGE_SIZE,
      pageSizes: pagination.pageSizes ?? DEFAULT_PAGE_SIZES,
    }
  })

  function getShowPagination() {
    return unref(isShow)
  }

  function setShowPagination(flag: boolean) {
    isShow.value = flag
  }

  return {
    getPaginationInfo,
    getShowPagination,
    setShowPagination,
  }
}
