<!-- 不推荐使用混合两种 API 的样式  -->
<script lang="ts">
import { useCounterStore } from '@/store/modules/option/counter'

export default {
  setup() {
    const counterStore = useCounterStore()
    return { counterStore }
  },
  data: () => {
    return {}
  },
  methods: {
    getAction() {
      this.counterStore.increment()
    },
  },
  computed: {
    quadrupleCounter() {
      return this.counterStore.doubleCount * 2
    },
  },
}
</script>

<template>
  <div>{{ quadrupleCounter }}</div>
</template>
<style scoped></style>
