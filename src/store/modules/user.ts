import { defineStore } from 'pinia'
import { store } from '@/store'
import { ACCESS_TOKEN, CURRENT_USER, IS_SCREENLOCKED } from '../mutation-types'
import { login } from '@/api/account/user'

import { storage } from '@/utils/Storage'

export type UserInfoType = {
  name: string
  email: string
  phone: string
}

export interface IUserState {
  token: string
  username: string
  welcome: string
  avatar: string
  permissions: any[]
  info: UserInfoType
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: () => ({
    token: storage.get(ACCESS_TOKEN, ''),
    username: '',
    welcome: '',
    avatar: '',
    permissions: [],
    info: storage.get(CURRENT_USER, {}),
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setAvatar(avatar: string) {
      this.avatar = avatar
    },
    setPermissions(permissions: []) {
      this.permissions = permissions
    },
    setUserInfo(info: UserInfoType) {
      this.info = info
    },
    // 用户登录动作
    async login(params: any) {
      const res = await login(params)
			return res
		},
    // 获取当前登录用户信息
    async getCurrentUserInfo() {},
    // 退出登录动作
    async logout() {
      this.setToken('')
      this.setPermissions([])
      this.setAvatar(''), this.setUserInfo({ name: '', email: '', phone: '' })
      storage.remove(ACCESS_TOKEN)
      storage.remove(CURRENT_USER)
    },
  },
})

export function useUser() {
  return useUserStore(store)
}
