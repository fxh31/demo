<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounter2Store } from '@/store/modules/setup/counter2'

const count2Store = useCounter2Store()
const { name: name2, count: count2, doubleCount: a } = storeToRefs(count2Store)
// 作为 action 的 increment 可以直接解构
const { increment } = count2Store

const handleClick = () => {
  increment()
}
const handleClickReset = () => {
  count2Store.$reset33()
}
</script>

<template>
  <div>
    <header>
      <h2>Vue3 Setup playground</h2>
    </header>
    <div>
      <section class="btn">
        <button @click="handleClick">add</button>
        <button @click="handleClickReset">reset</button>
      </section>
      <section>
        <p>count2: {{ count2 }} + doubleCount: {{ a }}</p>
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
