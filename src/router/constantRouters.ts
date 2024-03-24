import { RouteRecordRaw } from 'vue-router'

export const constantRouters: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    redirect: '/dashboard',
    meta: {
      title: '根目录',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
			needLogin: false
    },
  },
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/404/index.vue'),
		meta: {
			title: '页面没找到',
			needLogin: false
		}
	},
	{
		path: '/403',
		name: '403',
		component: () => import('@/views/403/index.vue'),
		meta: {
			title: '没有权限',
			needLogin: false
		}
	}
]
