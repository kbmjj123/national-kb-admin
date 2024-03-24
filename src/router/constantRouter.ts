import { RouteRecordRaw } from 'vue-router'

export const constantRouter: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: '/dashboard',
    meta: {
      title: '根目录',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
	{
		path: '/404',
		name: '404',
		component: () => import('@/views/404/index.vue'),
		meta: {
			title: '页面没找到'
		}
	},
	{
		path: '/403',
		name: '403',
		component: () => import('@/views/403/index.vue'),
		meta: {
			title: '没有权限'
		}
	}, 
	{
		path: '*',
		name: '*',
		redirect: '/'
	}
]
