import '/@/styles/index.less'
import 'virtual:windi.css' // windicss
import '@purge-icons/generated'
import 'virtual:svg-icons-register'
import 'element-plus/theme-chalk/dark/css-vars.css' // 暗黑模式
import { createApp } from 'vue'
import App from './App.vue'
import { router, setupRouter } from '/@/router'
import { setupStore } from '/@/store'
import { initAppConfigStore } from '/@/logics/initAppConfig'
import { setupRouterGuard } from './router/guard'

function bootstrap() {
  const app = createApp(App)
  setupRouter(app)
  setupStore(app)

  // 路由守卫
  setupRouterGuard(router)

  // 初始化项目配置
  initAppConfigStore()

  app.mount('#app')
}

bootstrap()
