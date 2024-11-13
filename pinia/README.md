# pinia

pinia demo。

## 定义

### store

一个保存着**全局**的状态和业务逻辑的实体，它有三个概念，state、getter 和 action，我们可以假设这些概念相当于组件中的 data、 computed 和 methods。

> 一个 store 是通过`defineStore()`定义的。

## 选项式和组合式

有两种写法，组合式中的：

### 组合式（setup）

- `ref()` 就是 state 属性；
- `computed()` 就是 getters；
- `function()` 就是 actions；

> 注意：要让 pinia 正确识别 state，必须在 setup store 中**返回 state 的所有属性**。这意味着，不能在 store 中使用私有属性。

- 组合式函数比选项式函数更加灵活，可以在其中自由地使用任何组合式函数（例如：watch），但会使SSR变复杂。
- 组合式函数依赖全局提供的属性；
  > 任何应用层面提供的属性都可以在 store 中使用 inject() 访问，就像在组件中一样。

## 使用

定义好了store后，需要去实例化来使用。

### 关于响应式

- store 是一个用 reactive 包装的对象，不需要在 getters 后面写 `.value`，也**不能对其解构，会失去响应式**（同 setup 中的 props）。

- 可以使用`storeToRefs()`提取其中属性（ref，computed）并保留其响应性。（action 则可以直接解构）

- 也可以直接使用`store.count`，不解构直接对象使用也响应式的。

- getters 中的计算属性如果绑定了对应 state 中的属性，那么state中的属性变化时它也会同样响应式地变化。

### 关于 ts

- store 中的 state使用箭头函数返回一个对象时，pinia 会自动推断出他们的类型。
- 如果类型复杂也可自定义一个接口。

### state

state 被定义为一个返回初始状态的函数。

#### 访问

默认情况下，你可以通过 store 实例访问 state，直接对其进行读写。并且通过这种方式是响应式的。

#### 重置

可以调用`$reset()`方法将 state 重置为初始值，在`$reset()`内部，会调用`state()`函数来创建一个新的状态对象，并用它替换当前状态。

- 选项式API：直接调用`store.$reset()`
  ```js
  const store = useStore()
  store.$reset()
  ```
- 组合式API：需要创建自己的`$reset()`方法

  ```js
  export const useCounterStore = defineStore('counter', () => {
    const count = ref(0)

    function $reset3() {
      count.value = 0
    }

    return { count, $reset3 }
  })
  ```

  > 组合式更加灵活，可以修改 $reset 的名字，返回自定义的值。

> 补充：对于没有 setup 写法的 Vue2，修改 store 里的属性可以先通过 mapWritableState 将里面的 state 导出，然后通过 this 就可以直接获取到对应 state 并进行操作。如果只是访问或者 computed 属性，则可以直接使用 mapState ，通过计算属性函数中的默认传参 store 获取对应的 state；mapState 还可以用于定义方法，通过默认参数 store 来操作 state。

#### 变更

除了用 `store.count++` 直接改变 store，你还可以调用 `$patch` 方法。它允许你用一个 state 的补丁对象在同一时间更改多个属性：

```js
countStore.$patch({
  count: countStore.count + 3,
  name: 'Hannah fen',
})

countStore.$patch(state => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```

#### 替换

你不能完全替换掉 store 的 state，因为那样会破坏其响应性。但是可以 patch 它。

#### 订阅

1. 可以通过 store 的 `$subscribe()` 监听 state 及其变化。

> 比起普通的 watch()，使用 $subscribe() 的好处是 subscriptions 在 patch 后只触发一次。

- 默认情况下，state subscription 会被绑定到添加它们的组件上 (如果 store 在组件的 setup() 里面)，当该组件被卸载时，它们将被自动删除。如果想在组件卸载后
  依旧保留它们，将 { detached: true } 作为第二个参数，

2. 也可以在 pinia 实例上使用 watch() 函数侦听整个 state。

```js
watch(
  pinia.state,
  state => {
    // 每当状态发生变化时，将整个 state 持久化到本地存储。
    localStorage.setItem('piniaState', JSON.stringify(state))
  },
  { deep: true },
)
```

### getter

等同于 store 的 state 的计算值。它是一个函数，接收 state 作为第一个参数，返回计算值。

- 大多数时候 getter 依赖 state，但也可能会使用其他 getter，可**以通过 this 访问到整个 store 实例**。但在 _ts 中必须定义返回类型_。

#### 访问本地

同 state。

#### 访问其他 getter

通过`this`访问到整个 store 实例，然后使用`this.xxx`即可。

> **注意**：需要为这个 getter 指定一个返回值的类型。

#### 向 getter 传参

不可传参，但是可从 getter 中返回一个函数，该函数可以接受任意参数。但这样 getter 就不会再被缓存，只是作为普通的有调用值的函数。

#### 访问其他 store 的 getter

直接引入其他的 store 进行访问即可。

### action

相当于组件中的 method，是定义业务逻辑的完美选择。

它与 getter 的用法大部分是相同的，但不同的是：

- 它可以是**异步的**。
- 可以使用 this 访问 state。
  > getter 中 this 和 state 都可以访问，此处同 getter 中的 this。this 具备完整的类型推导。
- 可以任意传参，因为它本来就是作为普通函数。
  > action 一切类型都可以被推导出来。

#### 访问其他 store 的 action

直接引入其他的 store 进行访问即可。

#### 订阅 action

可以通过 `store.$onAction()` 来监听 action 和它们的结果。

```js
const unsubscribe = someStore.$onAction(
  ({
    name, // action 名称
    store, // store 实例，类似 `someStore`
    args, // 传递给 action 的参数数组
    after, // 在 action 返回或解决后的钩子
    onError, // action 抛出或拒绝的钩子
  }) => {
    // 为这个特定的 action 调用提供一个共享变量
    const startTime = Date.now()
    // 这将在执行 "store "的 action 之前触发。
    console.log(`Start "${name}" with params [${args.join(', ')}].`)

    // 这将在 action 成功并完全运行后触发。
    // 它等待着任何返回的 promise
    after(result => {
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`,
      )
    })

    // 如果 action 抛出或返回一个拒绝的 promise，这将触发
    onError(error => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`,
      )
    })
  },
)

// 手动删除监听器
unsubscribe()
```

> 默认情况下，action 订阅器会被绑定到添加它们的组件上(如果 store 在组件的 `setup()` 内)。这意味着，当该组件被卸载时，它们将被自动删除。如果你想在组件卸载后依旧保留它们，请将 true 作为第二个参数传递给 action 订阅器。

### 插件

pinia 支持类似`Vue.use`的插件，该插件要在创建 store 实例之前注册进去才会生效。
`use`接收一个函数，该函数内部默认传参有：

- store 实例被 reactive 包装过，可自动解包。
- 由于插件里配置的 state 是在 store 实例化之前添加的，所以：
  - 它不会触发任何订阅函数；
  - 默认情况下`$reset`不会重置插件添加的 state，但是我们自己可以重写；
- 添加外部属性、第三方库的类实例或非响应式的简单值时，你应该先用`markRaw()`来包装一下它，再将它传给 pinia。
- 可在插件中使用 store.$subscribe 和 store.$onAction。
- 定义 store 时可以添加新的选项（除了 getter、action。state等以外）（此处示例为debouce）
- 在 store 中添加新的属性时，你也应该扩展 PiniaCustomProperties 接口。
