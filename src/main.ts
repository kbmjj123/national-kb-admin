import './styles/tailwind.css'
import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'

async function bootstrap() {
  const app = createApp(App)

  setupStore(app)

  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)

  app.mount('#app', true)
}

void bootstrap()
