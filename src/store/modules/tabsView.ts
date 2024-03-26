import { defineStore } from "pinia"
import { RouteLocationNormalized } from "vue-router"

// 不需要出现在标签页中的路由
const WHITE_LIST = ['Redirect', 'login']

export type RouteItem = Partial<RouteLocationNormalized> & {
	fullPath: string,
	path: string,
	name: string,
	hash: string,
	meta: object,
	params: object,
	query: object
}

export type ITabsViewState = {
	tabsList: RouteItem[]
}


export const useTabsViewStore = defineStore({
	id: 'app-tabs-view',
	state: (): ITabsViewState => ({
		tabsList: []
	}),
	actions: {
		// 初始化标签页
		initTabs(routes: RouteItem[]) {
			this.tabsList = routes
		},
		// 新增一个标签页
		addTab(route: RouteItem): boolean {
			if(WHITE_LIST.includes(route.name)) return false
			const isExists = this.tabsList.some(item => item.fullPath === route.fullPath)
			if(!isExists){
				this.tabsList.push(route)
			}
			return true
		},
		// 关闭左侧标签
		closeLeftTabs(route: RouteItem): void {
			const index = this.tabsList.findIndex(item => (item.fullPath === route.fullPath))
			this.tabsList = this.tabsList.filter((item, i) => i >= index || (item?.meta?.affix ?? false))
		},
		// 关闭右侧标签
		closeRightTabs(route: RouteItem): void {
			const index = this.tabsList.findIndex(item => (item.fullPath === route.fullPath))
			this.tabsList = this.tabsList.filter((item, i) => i <= index || (item?.meta?.affix ?? false))
		},
		// 关闭其他标签
		closeOtherTbas(route: RouteItem): void {
			this.tabsList = this.tabsList.filter(
        (item) => item.fullPath == route.fullPath || (item?.meta?.affix ?? false)
      );
		},
		// 关闭当前标签
		closeCurrentTab(route: RouteItem): void {
			const index = this.tabsList.findIndex(item => item.fullPath === route.fullPath)
			if(index > -1){
				this.tabsList.splice(index, 1)
			}
		},
		// 关闭全部标签
		closeAllTabs() {
			this.tabsList = this.tabsList.filter(item => item?.meta?.affix ?? false)
		}
	}
})