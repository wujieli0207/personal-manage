import { RouteRecordRaw } from "vue-router";
import { LAYOUT } from "/@/router/constant";

const article: RouteRecordRaw = {
  path: "/selfManage",
  name: "AelfManage",
  component: LAYOUT,
  // redirect: "",
  meta: {
    title: "个人管理",
  },
  children: [
    {
      path: "/weekReport",
      name: "WeekPeport",
      component: () => import("/@/views/selfManage/weekReport.vue"),
      meta: {
        title: "文章管理",
      },
    },
  ],
};

export default article;
