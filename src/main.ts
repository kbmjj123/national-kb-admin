import './styles/tailwind.css'
import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import router, { setupRouter } from './router'

async function bootstrap() {
  const app = createApp(App)

  setupStore(app)

  setupRouter(app)
  // 路由准备就绪后挂载 APP 实例
  await router.isReady()
  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)

  app.mount('#app', true)
}

void bootstrap()
