import { defineStore } from 'pinia'
import { useCounterStore } from './counter'

interface UserInfo {
  name: string
  age: number
  id: number
  active: boolean
}

interface UserState {
  userList: UserInfo[]
  user: null | UserInfo
  users: UserInfo[]
  number?: number
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      number: 9,
      userList: [],
      user: null,
      users: [
        { name: 'zs', age: 18, id: 1, active: true },
        { name: 'lisi', age: 28, id: 2, active: false },
      ],
      // student: ''
    }
  },
  getters: {
    getUserById(state) {
      return userId => state.users.find(user => user.id === userId)
    },
    getActiveUserById(state) {
      const activeUsers = state.users.filter(user => user.active)
      return userId => activeUsers.find(user => user.id === userId)
    },
    getCounterStore(state) {
      const useOtherCounter = useCounterStore()
      return useOtherCounter.count + state.number
    },
  },
  actions: {
    fetchNumber() {},
  },
})
