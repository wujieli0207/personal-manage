import { Router, RouteRecordRaw } from "vue-router";
import { PAGE_NOTE_FOUND_ROUTE } from "../routes/basic";
import { usePermissionStoreWithOut } from "/@/store/modules/permission";

export function createPermissionGuard(router: Router) {
  const permissionStore = usePermissionStoreWithOut();

  router.beforeEach(async () => {
    // 判断是否已经动态添加路由，如果没有则添加
    if (permissionStore.getDynamicAddedRoute) {
      return;
    }

    const routes = await permissionStore.buildRoutesAction();

    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });

    router.addRoute(PAGE_NOTE_FOUND_ROUTE as unknown as RouteRecordRaw);
    permissionStore.setDynamicAddedRoute(true);
  });
}
