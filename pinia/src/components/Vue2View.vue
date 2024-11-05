<script lang="ts">
import { mapState, mapWritableState } from 'pinia'
import { useCounterStore } from '@/store/modules/option/counter'

export default {
  data: () => {
    return {
      Fname: 'ff',
    }
  },

  methods: {
    ...mapState(useCounterStore, {
      handleClickAdd(store) {
        store.count++
      },
      reset(store) {
        store.count = 9
      },
    }),
    resetCount() {
      this.count = 0
    },
  },
  computed: {
    // ...mapState(useCounterStore, ['count']), // 同 countStore.count
    ...mapState(useCounterStore, {
      myOwnName: 'count',
      double: store => {
        console.log(store.count)
        return store.count * 2
      },
      addValue(store) {
        return store.count + store.doubleCount
      },
    }),
    ...mapWritableState(useCounterStore, ['count']),
    // ...mapWritableState(useCounterStore, {
    //   myOwnName2: 'count',
    // }),
  },
}
</script>

<template>
  <div>
    <header>
      <h2>Vue2 playground</h2>
    </header>
    <div>
      <section class="btn">
        <button @click="handleClickAdd">add</button>
        <button @click="resetCount">reset</button>
      </section>
      <section>
        <p>doule: {{ double }}</p>
        <p>count: {{ myOwnName }}</p>
        <p>addValue: {{ addValue }}</p>
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
