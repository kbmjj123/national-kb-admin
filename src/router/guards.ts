import { Router } from 'vue-router'
import { useUser } from '../store/modules/user'
// 创建全局路由守卫
export function createRouterGuards(router: Router) {
  router.beforeEach((to, from ,next) => {
		window['$loadingBar'] && window['$loadingBar'].start()
		const useUserStore = useUser()
		if(to.meta?.needLogin){
			// 访问的目标页面需要登录
			if(useUserStore.token){
				// 本地cookie中已存储对应的token，则直接进入
				next()
			}else{
				next({
					name: 'login',
					replace: true
				})
			}
		}else{
			next()
		}
  })
  router.afterEach((to, from, failure) => {
		window['$loadingBar'] && window['$loadingBar'].finish()
  })
}
