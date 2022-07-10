import { AppRouteRecordRaw } from "/@/router/types";
import { LAYOUT } from "/@/router/constant";

const table: AppRouteRecordRaw = {
  path: "/basicTable",
  name: "BasicTable",
  component: LAYOUT,
  redirect: "/basicTable",
  meta: {
    title: "表格",
    icon: "radix-icons:component-1",
  },
  children: [
    {
      path: "/basicTable",
      name: "BasicTable",
      component: () => import("/@/views/table/index.vue"),
      meta: {
        title: "基础表格",
      },
    },
  ],
};

export default table;
