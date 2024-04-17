import { defineStore } from 'pinia'
import { toRaw } from 'vue'
import { getAdminMenus } from '@/api/system/menu'
import { finalRouteList } from '@/router'
import { RouteRecordRaw } from 'vue-router'
import { constantRouters } from '@/router/constantRouters'

export interface IasyncRouteState {
	menus: RouteRecordRaw[],
	routers: RouteRecordRaw[],
	routersAdded: RouteRecordRaw[],
	keepAliveComponents: string[],
	isDynamicRouteAdd: boolean
}

export const useAsyncRouteStore = defineStore({
	id: 'app-async-route',
	state: (): IasyncRouteState => ({
		menus: [],	// 待渲染的当前路由菜单
		routers: constantRouters,
		routersAdded: [],	// 已添加的路由
		keepAliveComponents: [],	// keepalive的组件
		isDynamicRouteAdd: false // 用于判断路由是否已动态添加的标识
	}),
	getters: {
		getIsDynamicRouteAdd(): boolean {
			return this.isDynamicRouteAdd
		},
		getMenus(): RouteRecordRaw[] {
			return this.menus
		}
	},
	actions: {
		getRouters() {
			return toRaw(this.routersAdded)
		},
		setDynamicRouteAdd(isDynamicRouteAdd: boolean){
			this.isDynamicRouteAdd = isDynamicRouteAdd
		},
		setRoutes(routes: RouteRecordRaw[]) {
			this.routersAdded = routes
			this.routers = constantRouters.concat(routes)
		},
		setMenus(menus: RouteRecordRaw[]) {
			this.menus = menus
		},
		setKeepAliveComponents(compNames: string[]) {
			this.keepAliveComponents = compNames
		},
		// 读取远程菜单并生成本地可访问路由的动作
		async generateRoutes(){
			let remoteRoutes
			try{
				// const result = await getAdminMenus()
				remoteRoutes = finalRouteList
			}catch(err){
				console.error(err)
			}
			this.setRoutes(remoteRoutes)
			this.setMenus(remoteRoutes)
			return toRaw(remoteRoutes)
		}
	}
})