import { App } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { basicRoutes } from "./routes/";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}

/**
 * @description 重置路由
 */
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    // TODO 白名单路由暂时未考虑
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}
