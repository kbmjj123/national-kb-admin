import { defineStore } from 'pinia'
import { store } from '@/store'
import { ACCESS_TOKEN, CURRENT_USER, IS_SCREENLOCKED, REFRESH_TOKEN } from '../mutation-types'
import { login, getUserInfo, logout } from '@/api/system/user'

import { storage } from '@/utils/Storage'


export interface IUserState {
  refreshToken: string
	accessToken: string
  account: string
  avatar: string
  nickName: string
  email: string
  phone: string,
	role: 'user' | 'admin' | ''
}
const INIT_USER_INFO: IUserState = {
	refreshToken: storage.get(REFRESH_TOKEN),
	accessToken: storage.getCookie(ACCESS_TOKEN),
	account: '',
	avatar: '',
	nickName: '',
	email: '',
	phone: '',
	role: ''
}
export const useUserStore = defineStore({
  id: 'app-user',
  state: () => ({
		userInfo: INIT_USER_INFO,
		accessToken: ''
  }),
  getters: {
		showUserName: state => state.userInfo.nickName,
		isLogin: state => !!state.accessToken
	},
  actions: {
		setUserInfo(userInfo: IUserState){
			this.userInfo = userInfo
			this.accessToken = userInfo.accessToken
		},
    // 用户登录动作
    async login(params: any) {
      const res = await login(params)
			this.setUserInfo(res.data)
			storage.set(REFRESH_TOKEN, res.data.refreshToken)
			storage.setCookie(ACCESS_TOKEN, res.data.accessToken)
			await this.getCurrentUserInfo()
			return res
		},
    // 获取当前登录用户信息
    async getCurrentUserInfo() {
			const res = await getUserInfo()
			this.setUserInfo(res.data)
			storage.set(CURRENT_USER, res.data)
		},
    // 退出登录动作
    async logout() {
			await logout()
			this.setUserInfo(INIT_USER_INFO)
      storage.removeCookie(ACCESS_TOKEN)
			storage.remove(REFRESH_TOKEN)
      storage.remove(CURRENT_USER)
    },
  },
})

export function useUser() {
  return useUserStore(store)
}
