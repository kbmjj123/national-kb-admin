import { defineStore } from 'pinia'
import { store } from '@/store'
import { ACCESS_TOKEN, CURRENT_USER, IS_SCREENLOCKED } from '../mutation-types'
import { login, getUserInfo } from '@/api/account/account'

import { storage } from '@/utils/Storage'

export type UserInfoType = {
  name: string
  email: string
  phone: string
}

export interface IUserState {
  token: string
  username: string
  avatar: string
  info: UserInfoType
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: () => ({
    token: storage.get(ACCESS_TOKEN, ''),
    username: '',
    avatar: '',
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
		setUsername(username: string) {
			this.username = username
		},
    setUserInfo(info: UserInfoType | null) {
      this.info = info
    },
    // 用户登录动作
    async login(params: any) {
      const res = await login(params)
			this.setToken(res.token)
			storage.setCookie(ACCESS_TOKEN, res.token)
			await this.getCurrentUserInfo()
			return res
		},
    // 获取当前登录用户信息
    async getCurrentUserInfo() {
			const res = await getUserInfo()
			this.setAvatar(res.avatar)
			this.setUserInfo(res.info)
			this.setUsername(res.username)
			storage.set(CURRENT_USER, res)
		},
    // 退出登录动作
    async logout() {
      this.setToken('')
      this.setAvatar(''), this.setUserInfo(null)
      storage.remove(ACCESS_TOKEN)
      storage.remove(CURRENT_USER)
    },
  },
})

export function useUser() {
  return useUserStore(store)
}
