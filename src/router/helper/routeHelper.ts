import { cloneDeep, omit } from "lodash-es";
import { Router, createRouter, createWebHashHistory, RouteRecordNormalized } from "vue-router";
import { AppRouteRecordRaw } from "/@/router/types";

/**
 *
 * @param routeModules
 * @description 将多级路由转化为 2 级路由
 */
export function flatMultiLevelRoutes(routeModules: AppRouteRecordRaw[]) {
  const modules: AppRouteRecordRaw[] = cloneDeep(routeModules);

  for (let i = 0; i < modules.length; i++) {
    const routeModule = modules[i];
    // 非多级路由直接跳过
    if (!isMultipleRoute(routeModule)) {
      continue;
    }
    // 多级路由时提升路由层级
    promoteRouteLevel(routeModule);
  }
  return modules;
}

/**
 *
 * @param routeModule
 * @description 判断是否是多级路由
 */
function isMultipleRoute(routeModule: AppRouteRecordRaw) {
  if (!routeModule || !Reflect.has(routeModule, "children") || !routeModule.children?.length) {
    return false;
  }
}

/**
 *
 * @param routeModule
 * @description 提升路由层级
 */
function promoteRouteLevel(routeModule: AppRouteRecordRaw) {
  let router: Nullable<Router> = createRouter({
    history: createWebHashHistory(),
    routes: [routeModule as unknown as RouteRecordNormalized],
  });

  const routes = router.getRoutes();
  addToChildren(routes, routeModule.children || [], routeModule);
  router = null;

  // 排除 3 级
  routeModule.children = routeModule.children?.map((item) => omit(item, "children"));
}

/**
 * @description 将所有子路由全部放置到二级路由上
 */
function addToChildren(
  routes: RouteRecordNormalized[],
  children: AppRouteRecordRaw[],
  routeModule: AppRouteRecordRaw
) {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const route = routes.find((item) => item.name === child.name);
    if (!route) {
      continue;
    }

    routeModule.children = routeModule.children || [];
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children?.push(route as unknown as AppRouteRecordRaw);
    }

    // 存在子路由则继续递归
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule);
    }
  }
}
