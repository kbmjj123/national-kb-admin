import { Router, isNavigationFailure, RouteLocationNamedRaw } from 'vue-router'
import { useUser } from '../store/modules/user'
import { PageEnum } from '@/enums/pageEnum'
import { useAsyncRouteStore } from '@/store/modules/asyncRoute'

const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME

// 创建全局路由守卫
export function createRouterGuards(router: Router) {
	const asyncRouteStore = useAsyncRouteStore()
  router.beforeEach((to, from ,next) => {
		window['$loadingBar'] && window['$loadingBar'].start()

		const useUserStore = useUser()
		if(to.meta?.needLogin){
			// 访问的目标页面需要登录
			if(useUserStore.token){
				// 本地cookie中已存储对应的token，则直接进入
				next()
			}else{
				// 组装待重定向的路由以及参数，重定向到登录页面，保证在登录成功后，自动进入之前所访问的页面
				const redirectParams: RouteLocationNamedRaw = {
					name: LOGIN_NAME,
					replace: true,
					query: {
						targetPath: to.fullPath	// 重定向到登录页面，并自动拼接上目标页面
					}
				}
				next(redirectParams)
			}
		}else{
			next()
		}
		if(asyncRouteStore.getIsDynamicRouteAdd){
			next()
		}
		const routes = 
  })

  router.afterEach((to, from, failure) => {
		document.title = (to?.meta?.title as string) || document.title
		window['$loadingBar'] && window['$loadingBar'].finish()
		if(isNavigationFailure(failure)){
			// 路由导航出错
			console.error(failure)
		}
  })
	router.onError(err => {
		console.error(err)
	})
}
