import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 1,
    name: 'Hannah',
    items: [],
  }),
  getters: {
    doubleCount: state => state.count * 2,
    doubleCount2(): number {
      console.log(this.count)
      return this.count * 2
    },
    doublePlusOne(): number {
      return this.doubleCount + 1
    },
  },
  actions: {
    increment() {
      this.count++
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    },
    async getCount() {
      const useUser = useUserStore()
      useUser.fetchNumber()
    },
  },
  // 让任何 action 实现防抖
  debounce: {
    searchContacts: 300,
  },
})
