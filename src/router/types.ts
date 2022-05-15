import type { RouteMeta, RouteRecordRaw } from "vue-router";
import { RoleEnum } from "/@/enums/roleEnum";

export interface MenuTag {
  type?: "primary" | "success" | "warn" | "error";
  content?: string;
  dot?: boolean;
}

// 菜单相关属性
export interface Menu {
  name: string; // 菜单名称
  icon?: string; // 菜单 icon
  path: string; // 菜单路径
  paramPath?: string; // 包含参数的 path
  disabled?: boolean; // 是否禁用
  children?: Menu[]; // 子菜单
  orderNo?: number; // 排序
  roles?: RoleEnum; // 菜单权限设置方式
  meta?: Partial<RouteMeta>;
  tag?: MenuTag; // 菜单 tag
  hideMenu?: boolean; // 是否隐藏菜单
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  meta: RouteMeta;
}
