import { defineStore } from 'pinia'
import { toRaw } from 'vue'
import { getAdminMenus } from '@/api/system/menu'

export const useAsyncRouteStore = defineStore({
	id: 'app-async-route',
	state: () => ({
		menus: [],	// 待渲染的当前路由菜单
		routers: ,
		routersAdded: [],	// 已添加的路由
		keepAliveComponents: [],	// keepalive的组件
		isDynamicRouteAdd: false // 用于判断路由是否已动态添加的标识
	}),
	getters: {
		getIsDynamicRouteAdd(): boolean {
			return this.isDynamicRouteAdd
		}
	},
	actions: {
		// 读取远程菜单并生成本地可访问路由的动作
		async generateRoutes(){
			let remoteRoutes
			try{
				const result = await getAdminMenus()
				
			}catch(err){
				console.error(err)
			}
		}
	}
})