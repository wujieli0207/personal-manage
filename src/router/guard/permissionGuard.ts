import { PageEnum } from '/@/enums/pageEnum'
import { Router, RouteRecordRaw } from 'vue-router'
import { RootRoute } from '/@/router/routes'
import { PAGE_NOTE_FOUND_ROUTE } from '../routes/basic'
import { usePermissionStoreWithOut } from '/@/store/modules/permission'
import { useUserStoreWithOut } from '/@/store/modules/user'

const ROOT_PATH = RootRoute.path

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  const permissionStore = usePermissionStoreWithOut()

  router.beforeEach(async (to, from, next) => {
    // 如果从根路径，跳转到 home 路径，以 userStore 中的 home 为准
    if (
      from.path === ROOT_PATH &&
      to.path === PageEnum.BASE_HOME &&
      userStore.getUserInfo.homePath &&
      userStore.getUserInfo.homePath !== PageEnum.BASE_HOME
    ) {
      next(userStore.getUserInfo.homePath)
      return
    }

    // 判断是否已经动态添加路由，如果没有则添加
    if (permissionStore.getDynamicAddedRoute) {
      next()
      return
    }

    const routes = await permissionStore.buildRoutesAction()

    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw)
    })

    router.addRoute(PAGE_NOTE_FOUND_ROUTE as unknown as RouteRecordRaw)
    permissionStore.setDynamicAddedRoute(true)

    if (to.name === PAGE_NOTE_FOUND_ROUTE.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query })
    } else {
      const redirectPath = (from.query.redirect || to.path) as string
      const redirect = decodeURIComponent(redirectPath)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      next(nextData)
    }
  })
}
