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

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouter.concat(...routeModuleList),
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export function setupRouter(app: App){
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}
export default router