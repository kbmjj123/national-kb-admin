import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRouter } from './constantRouter'
import { createRouterGuards } from './guards'
import { IModuleType } from './types'

const modules = import.meta.glob<IModuleType>('./modules/**/*.ts', { eager: true })

const routeModuleList = Object.keys(modules).reduce((list, key) => {
  const module = modules[key].default ?? {}
  const moduleList = Array.isArray(module) ? [...module] : [module]
  return [...list, ...moduleList]
}, [])

// routeModuleList.sort((a, b) => {
//   return (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0)
// });
const finalRouteList = constantRouter.concat(...routeModuleList)
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
