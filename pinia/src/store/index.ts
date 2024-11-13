import type { App } from 'vue'
import { watch, ref, markRaw } from 'vue'
import { createPinia } from 'pinia'

function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const store = createPinia()

store.use(SecretPiniaPlugin)

function myPiniaPlugin(context) {
  console.log(context)
}
store.use(myPiniaPlugin)
store.use(({ store }) => {
  store.hello = 'hi'
  // 确保你的构建工具能处理这个问题，webpack 和 vite 在默认情况下应该能处理。
  if (process.env.NODE_ENV === 'development') {
    // 添加你在 store 中设置的键值
    store._customProperties.add('hello')
  }
})

const sharedRef = ref('shared')
store.use(({ store }) => {
  // 每个 store 都有单独的 `hello` 属性
  store.hello = ref('secret')
  // 它会被自动解包
  store.hello // 'secret'

  // 所有的 store 都在共享 `shared` 属性的值
  store.shared = sharedRef
  store.shared // 'shared'
})

store.use(({ store }) => {
  store.test = 666

  const originalReset = store.$reset.bind(store)
  return {
    // 重写 $reset
    $reset() {
      originalReset()
      store.test = 666
    },
  }
})

// 添加外部属性、第三方库的类实例（router）或非响应式的简单值时，你应该先用 markRaw() 来包装一下它，再将它传给 pinia。
store.use(({ store }) => {
  const foo = 'foo'
  store.fooName = markRaw(foo)
})

store.use(({ store }) => {
  store.$subscribe(() => {
    // 响应 store 变化
    console.log('全局中store改变了')
  })
  store.$onAction(() => {
    // 响应 store actions
    console.log('全局中store actions被调用了')
  })
})

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
