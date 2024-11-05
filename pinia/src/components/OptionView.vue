<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/store/modules/option/counter'
const countStore = useCounterStore()

const { name, count } = storeToRefs(countStore)
// 作为 action 的 increment 可以直接解构
const { increment } = countStore

const handleClick = () => {
  // increment()
  countStore.count++
}
const handleClickReset = () => {
  countStore.$reset()
}
const handleClickUpdate = () => {
  countStore.$patch({
    count: countStore.count + 3,
    name: 'Hannah fen',
  })

  // countStore.$patch(state => {
  //   state.items.push({ name: 'shoes', quantity: 1 })
  //   state.hasChanged = true
  //   console.log(state)
  // })
}

countStore.$subscribe(
  (mutation, state) => {
    console.log(mutation, state)
    console.log(88)
  },
  { detached: true },
)
</script>

<template>
  <div>
    <header>
      <h2>Vue3 Option playground</h2>
    </header>
    <div>
      <section class="btn">
        <button @click="handleClick">add</button>
        <button @click="handleClickReset">reset</button>
        <button @click="handleClickUpdate">update</button>
      </section>
      <section>
        <p>name: {{ name }}</p>
        <p>count: {{ count }}</p>
      </section>
    </div>
  </div>
</template>
<style scoped>
.btn {
  display: flex;
  gap: 20px;
}
</style>
