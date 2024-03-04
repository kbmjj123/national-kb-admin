import { Layout } from '../constant'

export default [
  {
    path: '/product',
    component: Layout,
    meta: {
      title: '商品管理',
      sort: 1,
    },
    children: [
      {
        name: 'manage',
        meta: {
          title: '商品管理',
        },
        component: () => import('@/views/product/index.vue'),
      },
    ],
  },
]
