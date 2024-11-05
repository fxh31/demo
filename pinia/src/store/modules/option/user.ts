import { defineStore } from 'pinia'

interface UserInfo {
  name: string
  age: number
}

interface UserState {
  userList: UserInfo[]
  user: null | UserInfo
}

export const userStore = defineStore('user', {
  state: (): UserState => {
    return {
      userList: [],
      user: null,
    }
  },
})
