import { AppRouteRecordRaw } from "/@/router/types";
import {
  EXCEPTION_COMPONENT,
  LAYOUT,
  PAGE_NOTE_FOUND_NAME,
  REDIRECT_NAME,
} from "/@/router/constant";

export const PAGE_NOTE_FOUND_ROUTE: AppRouteRecordRaw = {
  path: "/:path(.*)*",
  name: PAGE_NOTE_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: "ErrorPage",
    // 不在菜单和面包屑导航展示
    hideMenu: true,
    hideBreadCrumb: true,
  },
  children: [
    {
      path: "/:path(.*)*",
      name: PAGE_NOTE_FOUND_NAME,
      component: EXCEPTION_COMPONENT,
      meta: {
        title: "ErrorPage",
        // 不在菜单和面包屑导航展示
        hideMenu: true,
        hideBreadCrumb: true,
      },
    },
  ],
};

// ! TODO REDIRECT_ROUTE 暂时开发功能
export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: "/redirect",
  component: LAYOUT,
  name: "redirect",
  meta: {
    title: REDIRECT_NAME,
  },
};
