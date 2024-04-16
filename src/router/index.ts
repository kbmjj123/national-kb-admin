import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRouters } from './constantRouters'
import { createRouterGuards } from './guards'
import { IModuleType } from './types'
import { NotFound } from './constant'

const modules = import.meta.glob<IModuleType>('./modules/**/*.ts', { eager: true })

// 自动从各个路由定义模块文件中加载对应的路由列表
const routeModuleList = Object.keys(modules).reduce((list, key) => {
	const module = modules[key].default ?? {}
	// 将各个路由模块合并为一张路由表数组对象
	const moduleList = Array.isArray(module) ? [...module.map(item => ({ ...item, meta: { ...item.meta, needLogin: true } }))] : [{ ...module, meta: { ...module.meta, needLogin: true } }]
	return [...list, ...moduleList]
}, [])
// routeModuleList.sort((a, b) => {
//   return (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0)
// });
const finalRouteList = constantRouters.concat(...routeModuleList)
//! 添加404页面的捕获，记住这里需要将其放置在所有路由定义的最后面，用于其他路由没有匹配到时才匹配
finalRouteList.push({
	path: '/:catchAll(.*)',
	name: '404',
	component: NotFound,
	meta: {
		title: '页面没找到',
		needLogin: false
	}
})
const router = createRouter({
	history: createWebHashHistory(),
	routes: finalRouteList,
	strict: true,
	scrollBehavior: () => ({ left: 0, top: 0 }),
})

// 对外暴露的设置路由的api方法，并设置对应的路由守卫
export function setupRouter(app: App) {
	app.use(router)
	// 创建路由守卫
	createRouterGuards(router)
}
export default router
