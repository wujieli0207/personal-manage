import { AppRouteRecordRaw } from "/@/router/types";
import { LAYOUT } from "/@/router/constant";

const comp: AppRouteRecordRaw = {
  path: "/comp",
  name: "Comp",
  component: LAYOUT,
  redirect: "/markdown",
  meta: {
    title: "公共组件",
    icon: "radix-icons:component-1",
  },
  children: [
    {
      path: "/markdown",
      name: "Markdown",
      component: () => import("/@/views/comp/editor/markdown/index.vue"),
      meta: {
        title: "Markdown 编辑器",
      },
    },
  ],
};

export default comp;
