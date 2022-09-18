import { useRouter } from 'vue-router'
import { computed, unref } from 'vue'
import { useAppStore } from '/@/store/modules/app'

export function useFullContent() {
  const appStore = useAppStore()
  const router = useRouter()
  const { currentRoute } = router

  const getFullContent = computed(() => {
    // 如果路由参数中含有 __full__ 也设置为全屏
    const route = unref(currentRoute)
    const query = route.query
    if (query && Reflect.has(query, '__full__')) {
      return true
    }

    return appStore.getProjectConfig.fullContent
  })

  return { getFullContent }
}
