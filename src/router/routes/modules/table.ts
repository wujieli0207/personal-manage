import { AppRouteRecordRaw } from '/@/router/types'
import { LAYOUT } from '/@/router/constant'

const table: AppRouteRecordRaw = {
  path: '/table',
  name: 'table',
  component: LAYOUT,
  redirect: '/basicTable',
  meta: {
    title: '表格',
    icon: 'radix-icons:component-1',
  },
  children: [
    {
      path: '/basicTable',
      name: 'BasicTable',
      component: () => import('/@/views/table/index.vue'),
      meta: {
        title: '基础表格',
      },
    },
    {
      path: '/editTable',
      name: 'EditTable',
      component: () => import('/@/views/table/EditTable.vue'),
      meta: {
        title: '可编辑表格',
      },
    },
  ],
}

export default table
