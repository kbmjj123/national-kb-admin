import { Layout } from '../constant'

export default [
  {
    path: '/account',
    name: 'account',
    component: Layout,
    meta: {
      title: '账号管理',
      sort: 2,
    },
    children: [
      {
        path: 'manage',
        name: 'account_manage',
        meta: {
          title: '账号管理',
        },
        component: () => import('@/views/account/index.vue'),
      },
    ],
  },
]
