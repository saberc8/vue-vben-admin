import type { App } from 'vue'
// 组件按需注册
import { Layout } from 'ant-design-vue'

export function registerGlobComp(app: App) {
  app.use(Layout)
}
