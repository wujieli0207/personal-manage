import { useMultipleTabStore } from './../../store/modules/multipleTab'
import { RouteLocationNormalized, useRouter } from 'vue-router'
import { ref, toRaw } from 'vue'

export function initAffixTabs(): string[] {
  const tabStore = useMultipleTabStore()

  const affixList = ref<RouteLocationNormalized[]>([])
  const router = useRouter()

  /**
   *
   * @description 过滤出 meta 所有存在 affix 属性的路由
   */
  function filterAffixTabs(routes: RouteLocationNormalized[]) {
    const tabs: RouteLocationNormalized[] = []
    routes &&
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          tabs.push(toRaw(route))
        }
      })
    return tabs
  }

  /**
   * @description 添加固定的 tabs
   */
  function addAffixTabs() {
    const affixTabs = filterAffixTabs(router.getRoutes() as unknown as RouteLocationNormalized[])
    affixList.value = affixTabs
    for (const tab of affixTabs) {
      tabStore.addTab({
        meta: tab.meta,
        name: tab.name,
        path: tab.path,
      } as unknown as RouteLocationNormalized)
    }
  }

  // 是否添加过 Affix Tabs 加一个锁，避免重复添加
  let isAddAffix = false

  if (!isAddAffix) {
    addAffixTabs()
    isAddAffix = false
  }

  return affixList.value.map((item) => item.meta?.title).filter(Boolean) as string[]
}
