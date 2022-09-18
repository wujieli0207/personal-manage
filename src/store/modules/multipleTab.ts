import { useUserStore } from './user'
import { defineStore } from 'pinia'
import { RouteLocationNormalized, Router } from 'vue-router'
import projectSetting from '/@/settings/projectSetting'
import { Persistent } from '/@/utils/cache/persistent'
import { MULTIPLE_TABS_KEY } from '/@/enums/cacheEnum'
import { store } from '/@/store'
import { getRawRoute } from '/@/utils'
import { PageEnum } from '/@/enums/pageEnum'
import { PAGE_NOTE_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic'
import { toRaw, unref } from 'vue'

const getToTarget = (tabItem: RouteLocationNormalized) => {
  const { params, path, query } = tabItem
  return {
    params: params || {},
    path,
    query: query || {},
  }
}

export interface MultipleTabState {
  cacheTabList: Set<string>
  tabList: RouteLocationNormalized[]
  lastDragEndIndex: number
}

const cacheTab = projectSetting.multiTabsSetting.cache

export const useMultipleTabStore = defineStore({
  id: 'app-multiple-tab',
  state: (): MultipleTabState => ({
    cacheTabList: new Set(),
    tabList: cacheTab ? Persistent.getLocal(MULTIPLE_TABS_KEY) || [] : [],
    lastDragEndIndex: 0,
  }),
  getters: {
    getCachedTabList(): string[] {
      return Array.from(this.cacheTabList)
    },
    getTabList(): RouteLocationNormalized[] {
      return this.tabList
    },
    getLastDragEndIndex(): number {
      return this.lastDragEndIndex
    },
  },
  actions: {
    /**
     * @description 更新缓存的 tabList
     */
    updateCacheTab() {
      const cacheMap: Set<string> = new Set()

      for (const tab of this.tabList) {
        const item = getRawRoute(tab)
        const notNeedCache = item.meta?.ignoreKeepAlive
        if (notNeedCache) continue

        const name = item.name as string
        cacheMap.add(name)
      }
      this.cacheTabList = cacheMap
    },
    /**
     *
     * @param route RouteLocationNormalized
     * @returns
     * @description 新增一个 tab
     */
    async addTab(route: RouteLocationNormalized) {
      const { path, name, fullPath, params, query, meta } = getRawRoute(route)

      // 登录、404、重定向路由不用在 tab 展示
      if (
        path === PageEnum.BASE_LOGIN ||
        path === PageEnum.ERROR_PAGE ||
        !name ||
        [PAGE_NOTE_FOUND_ROUTE.name, REDIRECT_ROUTE.name].includes(name as string)
      ) {
        return
      }

      // 如果 tab 中存在就不用重复添加
      let updateIndex = -1
      const tabHasExits = this.tabList.some((tab, index) => {
        updateIndex = index
        return (tab.fullPath || tab.path) === (fullPath || path)
      })

      if (tabHasExits) {
        const currentTab = toRaw(this.tabList)[updateIndex]
        if (!currentTab) return

        // 更新已存在的tab参数相关信息
        currentTab.params = params || currentTab.params
        currentTab.query = query || currentTab.query
        currentTab.fullPath = fullPath || currentTab.fullPath
        this.tabList.splice(updateIndex, 1, currentTab)
      } else {
        // 添加 tab 场景
        // 获取动态路由打开数量，如果大于 0 就需要控制打开数量
        const dynamicLevel = meta?.dynamicLevel ?? -1
        if (dynamicLevel > 0) {
          const realPath = meta?.realPath ?? ''

          // 如果打开动态路由数超过特定值
          if (
            this.tabList.filter((item) => item.meta.realPath ?? '' === realPath).length >=
            dynamicLevel
          ) {
            // 关闭第一个路由
            const index = this.tabList.findIndex((item) => item.meta.realPath === realPath)
            index !== -1 && this.tabList.splice(index, 1)
          }
        }
        this.tabList.push(route)
      }
      this.updateCacheTab()
      cacheTab && Persistent.setLocal(MULTIPLE_TABS_KEY, this.tabList)
    },
    /**
     *
     * @description 关闭 tab
     */
    async closeTab(tab: RouteLocationNormalized, router: Router) {
      const close = (route: RouteLocationNormalized) => {
        const {
          fullPath,
          meta: { affix },
        } = route

        // tab 是固定的，不允许关闭
        if (affix) return

        const index = this.tabList.findIndex((item) => item.fullPath === fullPath)
        index !== -1 && this.tabList.splice(index, 1)
      }

      const { currentRoute, replace } = router

      // 关闭非 currentRoute 的 tab
      const { path } = unref(currentRoute)
      if (path !== tab.path) {
        close(tab)
        return
      }

      // 关闭 tab 后需要跳转的路由
      let toTarget = {}

      const index = this.tabList.findIndex((item) => item.path === path)

      // 要关闭 tab 是左侧第一个 tab
      if (index === 0) {
        // 如果只有一个 tab，跳转至 home，否则跳转至右侧 tab
        if (this.tabList.length === 1) {
          const userStore = useUserStore()
          toTarget = userStore.getUserInfo.homePath || PageEnum.BASE_HOME
        } else {
          const page = this.tabList[index + 1]
          toTarget = getToTarget(page)
        }
      } // 要关闭 tab 不是左侧第一个 tab，直接跳转到前一个 tab
      else {
        const page = this.tabList[index - 1]
        toTarget = getToTarget(page)
      }

      close(currentRoute.value)
      await replace(toTarget)
    },
    /**
     *
     * @description 根据 key 关闭 tab
     */
    async closeTabByKey(key: string, router: Router) {
      const index = this.tabList.findIndex((item) => (item.fullPath || item.path) === key)

      if (index === -1) return

      await this.closeTab(this.tabList[index], router)
      const { currentRoute, replace } = router
      // 当前路由是否存在于 tabList
      const isActivated = this.tabList.findIndex((item) => {
        return item.fullPath === currentRoute.value.fullPath
      })

      if (isActivated !== -1) return

      // 如果当前路由不存在于 tabList，尝试切换到其他路由
      let pageIndex
      if (index > 0 && index < this.tabList.length - 1) {
        pageIndex = index
      } else {
        pageIndex = -1
      }

      if (pageIndex >= 0) {
        const page = this.tabList[index - 1]
        const toTarget = getToTarget(page)
        await replace(toTarget)
      }
    },
    /**
     * @description 清空已缓存的 tab
     */
    clearCacheTabs(): void {
      this.cacheTabList = new Set()
    },
    /**
     * @description 重置所有状态
     */
    resetState(): void {
      this.tabList = []
      this.clearCacheTabs()
    },
  },
})

export function useMultipleTabStoreWithOutStore() {
  return useMultipleTabStore(store)
}
