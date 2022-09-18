import { AppRouteRecordRaw } from './../../router/types'
import { useAppStore } from '/@/store/modules/app'
import { useUserStore } from './user'
import { defineStore } from 'pinia'
import { store } from '/@/store'
import { Menu } from '/@/router/types'
import { getPermCode } from '/@/api/user'
import { toRaw } from 'vue'
import projectSetting from '/@/settings/projectSetting'
import { RoleEnum } from '/@/enums/roleEnum'
import { PermissionModeEnum } from '/@/enums/appEnum'
import { asyncRoutes } from '/@/router/routes'
import { filter } from '/@/utils/helper/treeHelper'
import { transformRouteToMenu } from '/@/router/helper/menuHelper'
import { flatMultiLevelRoutes } from '/@/router/helper/routeHelper'

interface PermissionState {
  permCodeList: string[] | number[]
  isDynamicAddedRoute: boolean
  lastBuildMenuTime: number // 用于出发菜单重新更新的时间
  backMenuList: Menu[]
  frontMenuList: Menu[]
}

export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    permCodeList: [],
    isDynamicAddedRoute: false,
    lastBuildMenuTime: 0,
    backMenuList: [],
    frontMenuList: [],
  }),
  getters: {
    getPermCodeList(): string[] | number[] {
      return this.permCodeList
    },
    getDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime
    },
    getBackMenuList(): Menu[] {
      return this.backMenuList
    },
    getFrontMenuList(): Menu[] {
      return this.frontMenuList
    },
  },
  actions: {
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime()
    },
    setBackMenuList(list: Menu[]) {
      this.backMenuList = list
      list?.length > 0 && this.setLastBuildMenuTime()
    },
    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list
    },
    resetState() {
      this.permCodeList = []
      this.isDynamicAddedRoute = false
      this.backMenuList = []
      this.lastBuildMenuTime = 0
    },
    async changePermissionCode() {
      const codeList = await getPermCode()
      this.setPermCodeList(codeList)
    },
    /**
     * @description 构建动态路由
     */
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      const userStore = useUserStore()
      const appStore = useAppStore()

      let routes: AppRouteRecordRaw[] = []
      const roleList = toRaw(userStore.getRoleList) || []
      const { permissionMode = projectSetting.permissionMode } = appStore.getProjectConfig

      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route
        const { roles } = meta || {}
        if (!roles) return true
        return roleList.some((role) => (roles as RoleEnum[]).includes(role))
      }

      const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route
        const { ignoreRoute } = meta || {}
        return !ignoreRoute
      }

      switch (permissionMode) {
        case PermissionModeEnum.ROUTE_MAPPING:
          // 从异步路由集合中过滤出在用户权限 roleList 中的路由和没有设置权限的路由
          routes = filter(asyncRoutes, routeFilter)
          routes = routes.filter(routeFilter)
          // 路由转化为菜单
          const menuList = transformRouteToMenu(routes, true)
          // 过滤掉需要生成菜单，但是忽略路由的情况
          routes = filter(routes, routeRemoveIgnoreFilter)
          routes = routes.filter(routeFilter)
          // 菜单按照 orderNo 升序排序
          menuList.sort((a, b) => {
            return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0)
          })

          this.setFrontMenuList(menuList)
          routes = flatMultiLevelRoutes(routes)
          break
      }
      // TODO ERROR_LOG_ROUTE patchHomeAffix 未完成
      return routes
    },
  },
})

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
