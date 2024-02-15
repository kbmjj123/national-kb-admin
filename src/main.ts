import { createApp } from "vue"
import "./style.css"
import { setupNaive } from "./plugins/naive"
import App from "./App.vue"

async function bootstrap() {
  const app = createApp(App)

  // setupNaive(app);

  const meta = document.createElement("meta")
  meta.name = "naive-ui-style"
  document.head.appendChild(meta)

  app.mount("#app", true)
}

void bootstrap()
