import { AppRouteRecordRaw } from "/@/router/types";
import { LAYOUT } from "/@/router/constant";

const form: AppRouteRecordRaw = {
  path: "/form",
  name: "Form",
  component: LAYOUT,
  redirect: "/basicForm",
  meta: {
    title: "表单",
    icon: "radix-icons:component-1",
  },
  children: [
    {
      path: "/basicForm",
      name: "BasicForm",
      component: () => import("/@/views/form/index.vue"),
      meta: {
        title: "基础表单",
      },
    },
  ],
};

export default form;
