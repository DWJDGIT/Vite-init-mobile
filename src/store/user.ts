import { UserInfo, Token } from '@/model/comm'
import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
export default defineStore('user', function () {
  // user information
  const userInfo = reactive<UserInfo>({
    userId: '',
    userName: '',
    avatar: '',
    roleCodes: [],
    token: localStorage.getItem('token') || '',
  })
  // set local storage
  const setLocalStorage = (data: Token) => {
    userInfo.token = data?.token
    localStorage.setItem('token', data?.token)
  }
  // clear local storage
  const clearLocalStorage = () => {
    userInfo.token = ''
    localStorage.removeItem('token')
  }
  // logout
  const userLogout = () => {
    clearLocalStorage()
  }

  return {
    ...toRefs(userInfo),
    setLocalStorage,
    clearLocalStorage,
    userLogout,
  }
})
