<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/store/modules/option/counter'
import { useUserStore } from '@/store/modules/option/user'
const countStore = useCounterStore()
const userStore = useUserStore()

const { name, count } = storeToRefs(countStore)
// 作为 action 的 increment 可以直接解构
const { increment } = countStore

const { getUserById } = userStore

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
  },
  { detached: true },
)
// 重写后 $reset
countStore.test = 99
console.log(countStore.test)
countStore.$reset()
console.log(countStore.test)

// 被包装过（markRaw）的值
console.log(countStore.fooName)
</script>

<template>
  <div>
    <header>
      <h2>Vue3 Option playground</h2>
    </header>
    <div class="content">
      <section class="btn">
        <button @click="handleClick">add</button>
        <button @click="handleClickReset">reset</button>
        <button @click="handleClickUpdate">update</button>
      </section>
      <section>
        <p>name: {{ name }}</p>
        <p>count: {{ count }}</p>
        <p>double count: {{ countStore.doublePlusOne }}</p>
        <p>double count2: {{ countStore.doubleCount2 }}</p>
      </section>
      <!-- <section>{{ userStore.getUserById(2) }}</section> -->
      <section>{{ getUserById(2) }}</section>
      <section>{{ userStore.getCounterStore }}</section>
    </div>
  </div>
</template>
<style scoped>
.btn {
  display: flex;
  gap: 20px;
}
.content {
  display: flex;
  flex-direction: column;
}
</style>
