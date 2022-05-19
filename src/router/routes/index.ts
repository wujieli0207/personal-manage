import { AppRouteRecordRaw } from "../types";
import { PAGE_NOTE_FOUND_ROUTE } from "./basic";

const modules = import.meta.globEager("./modules/**/*.ts");

const routeModuleList: AppRouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOTE_FOUND_ROUTE, ...routeModuleList];

export const LoginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("/@/views/login/index.vue"),
  meta: {
    title: "登录",
  },
};

export const HomeRoute: AppRouteRecordRaw = {
  path: "/layout",
  name: "layout",
  component: () => import("/@/layouts/index.vue"),
  meta: {
    title: "主页",
  },
  children: [
    {
      path: "/home",
      name: "home",
      component: () => import("/@/views/home/index.vue"),
      meta: {
        title: "home",
      },
    },
  ],
};

export const basicRoutes = [
  LoginRoute,
  HomeRoute,
  ...asyncRoutes,
  PAGE_NOTE_FOUND_ROUTE,
];
