import './styles/tailwind.css'
import { createApp } from 'vue'
import App from './App.vue'

async function bootstrap() {
  const app = createApp(App)

  const meta = document.createElement('meta')
  meta.name = 'naive-ui-style'
  document.head.appendChild(meta)

  app.mount('#app', true)
}

void bootstrap()
