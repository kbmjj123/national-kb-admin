import { RouteRecordRaw } from 'vue-router'

// 对外暴露的公共布局组件
export const Layout = () => import('@/layout/index.vue')

export const RedirectName = 'Redirect'

// 对外暴露的404公共组件
export const NotFound = () => import('@/views/404/index.vue')
export const NotFoundName = '404'
export const NotFoundRoute: RouteRecordRaw = {
	path: '/:catchAll(.*)',
	name: '404',
	component: NotFound,
	meta: {
		title: '页面没找到',
		needLogin: false,
		hideBreadcrumb: true
	}
}