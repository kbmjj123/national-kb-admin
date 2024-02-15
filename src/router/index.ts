import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRouter } from './constantRouter'
import { createRouterGuards } from './guards'


const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export function setupRouter(app: App){
  app.use(router)
  // 创建路由守卫
  createRouterGuards(router)
}