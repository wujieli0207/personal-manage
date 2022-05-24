import { RoleEnum } from "/@/enums/roleEnum";

declare module "vue-router" {
  export declare interface RouteMeta extends Record<string | number | symbol, unknown> {
    title: string; // 路由标题
    orderNo?: number; // 菜单排序，
    dynamicLevel?: number; // 动态路由可打开 Tab 页数
    realPath?: string; // 动态路由实际 path
    ignoreAuth?: string; // 是否忽略权限，只在权限模式位 role 时生效
    roles?: RoleEnum[]; // 可访问的角色，只在权限模式位 role 时生效
    ignoreKeepAlive?: boolean; // 是否忽略 keep-alive 缓存
    affix?: boolean; // 是否固定 tab
    icon?: string; // 菜单图标
    frameSrc?: string; // 内嵌 iframe 的地址
    transitionName?: string; // 该路由切换的动画名称
    hideBreadCrumb?: boolean; // 隐藏该路由在面包屑上的导航
    carryParam?: boolean; // 如果该路由会携带参数，且需要在tab页上面显示。则需要设置为true
    hideChildrenInMenu?: boolean; // 隐藏所有子菜单
    currentActiveMenu?: string; // 当前激活的菜单
    hideTab?: boolean; // tab 页中不展示该路由
    hideMenu?: boolean; // 当前路由不在菜单展示
    isLink?: boolean; // 是否是外部链接
    ignoreRoute?: boolean; // 用于在ROUTE_MAPPING以及BACK权限模式下，生成对应的菜单而忽略路由
    // 是否在子级菜单的完整path中忽略本级path
    hidePathForChildren?: boolean;
  }
}
