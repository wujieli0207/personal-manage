import { MenuModule } from "./../types";
import { isUrl } from "/@/utils/is";
import { RouteRecordNormalized } from "vue-router";
import { Menu } from "../types";
import { PermissionModeEnum } from "/@/enums/appEnum";
import { useAppStoreWithOut } from "/@/store/modules/app";
import { usePermissionStore } from "/@/store/modules/permission";
import { pathToRegexp } from "path-to-regexp";
import { router } from "/@/router";
import { filter } from "/@/utils/helper/treeHelper";
import { transformMenuModule } from "../helper/menuHelper";

const modules = import.meta.globEager("../routes/modules/**/*.ts");

const menus: Menu[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  menus.push(...modList);
});

const staticMenus: Menu[] = [];
// 通过立即执行函数获取全量菜单列表
(() => {
  for (const menu of menus) {
    staticMenus.push(transformMenuModule(menu));
  }
})();

/**
 *
 * @description 获取菜单列表
 */
export function getMenus(): Menu[] {
  const menus = getAsyncMenus();
  if (isRoleMode()) {
    const routes = router.getRoutes();
    return filter(menus, basicFilter(routes));
  }
  return menus;
}

/**
 * @description 获取异步菜单，只在 Back、Route_Mapping 模式下会过滤掉配置 hideMenu 的菜单
 */
function getAsyncMenus() {
  const permissionStore = usePermissionStore();
  if (isBackMode()) {
    return permissionStore.getBackMenuList.filter(
      (item) => !item.meta?.hideMenu && !item.hideMenu
    );
  }
  if (isRouteMappingMode()) {
    return permissionStore.getFrontMenuList.filter((item) => !item.hideMenu);
  }
  return staticMenus;
}

// ========== Helper =========

function getPermissionMode() {
  const appStore = useAppStoreWithOut();
  return appStore.getProjectConfig.permissionMode;
}

function isBackMode() {
  return getPermissionMode() === PermissionModeEnum.BACK;
}

function isRouteMappingMode() {
  return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING;
}

function isRoleMode() {
  return getPermissionMode() === PermissionModeEnum.ROLE;
}

function basicFilter(routes: RouteRecordNormalized[]) {
  return (menu: Menu) => {
    const matchRoute = routes.find((route) => {
      // path 是 url 直接返回 true
      if (isUrl(menu.path)) return true;

      if (route.meta?.carryParam) {
        return pathToRegexp(route.path).test(menu.path);
      }

      const isSame = route.path === menu.path;
      if (!isSame) return false;

      if (route.meta?.ignorePath) return true;

      return isSame || pathToRegexp(route.path).test(menu.path);
    });

    if (!matchRoute) return false;
    menu.icon = menu.icon || matchRoute.meta.icon;
    menu.meta = matchRoute.meta;
    return true;
  };
}
