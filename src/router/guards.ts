import { Router } from 'vue-router'
import { ACCESS_TOKEN } from '../store/mutation-types'
// 创建全局路由守卫
export function createRouterGuards(router: Router) {
  router.beforeEach((to, from ,next) => {
		console.info(window['$loadingBar'])
		window['$loadingBar'] && window['$loadingBar'].start()
		next()
  })
  router.afterEach((to, from, failure) => {
		window['$loadingBar'] && window['$loadingBar'].finish()
  })
}
