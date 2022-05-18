import { Router, RouteRecordRaw } from "vue-router";
import { usePermissionStoreWithOut } from "/@/store/modules/permission";

export function createPermissionGuard(router: Router) {
  const permissionStore = usePermissionStoreWithOut();

  router.beforeEach(async (to, from) => {
    // 判断是否已经动态添加路由，如果没有则添加
    if (permissionStore.getDynamicAddedRoute) {
      return;
    }

    const routes = await permissionStore.buildRoutesAction();

    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });

    // TODO PAGE_NOT_FOUND_ROUTE
    permissionStore.setDynamicAddedRoute(true);
  });
}
