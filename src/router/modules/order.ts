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
          title: '销售订单',
        },
        component: () => import('@/views/order/index.vue'),
      },
			{
        path: 'detail/:id',
        name: 'order_detail',
        meta: {
          title: '订单详情',
        },
        component: () => import('@/views/order/detail/index.vue'),
      },
			{
        path: 'write-off',
        name: 'order_write_off',
        meta: {
          title: '订单核销',
        },
        component: () => import('@/views/order/write-off/index.vue'),
      },
			{
				path: 'print/:id',
        name: 'order_print',
        meta: {
          title: '订单打印',
        },
        component: () => import('@/views/order/print/index.vue'),
			}
    ],
  },
]
