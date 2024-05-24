import { Layout } from '../constant'

export default [
  {
    path: '/order',
		name: 'order',
    component: Layout,
    meta: {
      title: '订单管理',
      sort: 2,
    },
    children: [
      {
        path: 'manage',
        name: 'order_manage',
        meta: {
          title: '订单管理',
        },
        component: () => import('@/views/order/index.vue'),
      },
			{
        path: 'detail/:id',
        name: 'order_detail',
        meta: {
          title: '订单详情',
        },
        component: () => import('@/views/order/index.vue'),
      },
    ],
  },
]
