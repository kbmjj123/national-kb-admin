import { Layout } from '../constant'
export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/console',
    component: Layout,
    meta: {
      title: '工作台',
      sort: 0,
    },
    children: [
      {
        path: 'console',
        name: 'dashboard_console',
        meta: {
          title: '主控台',
          affix: true,
        },
        component: () => import('@/views/dashboard/index.vue'),
      },
    ],
  },
]
