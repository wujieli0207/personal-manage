import { cloneDeep } from 'lodash-es'
import { AppRouteRecordRaw, Menu } from '/@/router/types'
import { treeMap } from '/@/utils/helper/treeHelper'
import { isUrl } from '/@/utils/is'

/**
 *
 * @param menus
 * @param parentPath
 * @description 处理嵌套菜单的 path
 */
function joinParentPath(menus: Menu[], parentPath = '') {
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]

    // 注意：以 "/" 开头的路径将被视为根路径
    if (!menu.path.startsWith('/') || isUrl(menu.path)) {
      menu.path = `${parentPath}/${menu.path}`
    }

    // 如果存在 children，就继续递归处理 children 路径
    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.meta?.hidePathForChildren ? parentPath : menu.path)
    }
  }
}

/**
 *
 * @param routeModList 待转化的路由数组
 * @param routerMapping
 * @description 将动态路由转化为菜单
 */
export function transformRouteToMenu(routeModList: AppRouteRecordRaw[], routerMapping = false) {
  const cloneRouteModList = cloneDeep(routeModList)
  const routeList: AppRouteRecordRaw[] = []

  cloneRouteModList.forEach((item) => {
    if (routerMapping && item.meta?.hideChildrenInMenu && typeof item.redirect === 'string') {
      item.path = item.redirect
    }

    if (item.meta?.single) {
      const realItem = item?.children?.[0]
      realItem && routeList.push(realItem)
    } else {
      routeList.push(item)
    }
  })

  const list = treeMap(routeList, {
    conversion: (node: AppRouteRecordRaw) => {
      const {
        meta: { title, hideMenu = false },
      } = node

      return {
        ...(node.meta || {}),
        meta: node.meta,
        name: title,
        hideMenu,
        path: node.path,
        ...(node.redirect ? { redirect: node.redirect } : {}),
      }
    },
  })
  joinParentPath(list)
  return cloneDeep(list)
}

/**
 *
 * @param menuModule
 * @description 转换菜单 Module
 */
export function transformMenuModule(menu: Menu): Menu {
  const menuList = [menu]

  joinParentPath(menuList)
  return menuList[0]
}
