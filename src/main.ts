import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import 'virtual:uno.css'
// Vant 桌面端适配
import '@vant/touch-emulator'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'

import './styles/app.scss'
import store from './stores'
import routes from './routes'
import App from './App.vue'

const app = createApp(App)
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

app.config.errorHandler = (err) => {
  console.error(err)
}
app.use(store)
app.use(router)
app.mount('#app')
