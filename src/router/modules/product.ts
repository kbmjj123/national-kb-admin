import { Layout } from '../constant'

export default [
  {
    path: '/product',
		name: 'product',
    component: Layout,
    meta: {
      title: '商品管理',
      sort: 1,
    },
    children: [
      {
				path: '/product_manage',
        name: 'product_manage',
        meta: {
          title: '商品列表',
					isMenu: true
        },
        component: () => import('@/views/product/index.vue'),
      },
			{
				path: '/product_edit',
				name: 'product_edit',
				meta: {
					title: '商品编辑'
				},
				component: () => import('@/views/product/detail/index.vue')
			},
			{
				path: '/category',
				name: 'category_manage',
				meta: {
					title: '分类管理',
					isMenu: true
				},
				component: () => import('@/views/category/index.vue')
			},
			{
				path: '/brand',
				name: 'brand_manage',
				meta: {
					title: '品牌管理',
					isMenu: true
				},
				component: () => import('@/views/brand/index.vue')
			},
			{
				path: '/stock',
				name: 'stock_manage',
				meta: {
					title: '库存管理',
					isMenu: true
				},
				component: () => import('@/views/stock/index.vue')
			}
    ],
  },
]
