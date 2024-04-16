import { Layout } from '../constant'

export default [
  {
    path: '/setting',
		name: 'setting',
    component: Layout,
    meta: {
      title: '设置',
      sort: 3,
    },
    children: [
      {
        path: 'manage',
        name: 'setting_manage',
        meta: {
          title: '系统设置',
        },
        component: () => import('@/views/setting/index.vue'),
      },
    ],
  },
]
