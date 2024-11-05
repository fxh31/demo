import type { App } from 'vue'
import { watch } from 'vue'
import { createPinia } from 'pinia'

const store = createPinia()

export function setupStore(app: App<Element>) {
  app.use(store)

  // 在 pinia 实例上使用 watch() 函数侦听整个 state。
  watch(
    store.state,
    state => {
      console.log('store 中有被修改')
    },
    { deep: true },
  )
}

export { store }
