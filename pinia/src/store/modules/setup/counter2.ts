import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounter2Store = defineStore('counter2', () => {
  const count = ref(0)
  const name = ref('Hannah')
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  function $reset33() {
    count.value = 2
  }
  return { count, name, doubleCount, increment, $reset33 }
})
