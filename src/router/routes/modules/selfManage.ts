import { AppRouteRecordRaw } from "/@/router/types";
import { LAYOUT } from "/@/router/constant";

const article: AppRouteRecordRaw = {
  path: "/selfManage",
  name: "SelfManage",
  component: LAYOUT,
  redirect: "/weekReportView",
  meta: {
    title: "个人管理",
    icon: "ion:bar-chart-outline",
  },
  children: [
    {
      path: "/weekReportView",
      name: "WeekReportView",
      component: () => import("/@/views/selfManage/WeekReportView/index.vue"),
      meta: {
        title: "每周统计数据视图",
      },
    },
    {
      path: "/weekReportManage",
      name: "WeekReportManage",
      component: () => import("/@/views/selfManage/WeekReportManage/index.vue"),
      meta: {
        title: "每周统计数据管理",
      },
    },
  ],
};

export default article;
