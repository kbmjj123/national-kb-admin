import { http } from '@/utils/http'
import { BasicParams, ObjectResponseModel } from '../types'
import type { IUserState } from '@/store/modules/user'

// 获取当前登录用户信息
export function getUserInfo(): Promise<ObjectResponseModel<IUserState>> {
	return http.request({
		url: '/user/info',
		method: 'GET'
	})
}

// 登录动作
export function login(params: BasicParams): Promise<ObjectResponseModel<{token: string}>> {
  return http.request({
    url: '/user/login',
    method: 'POST',
    params,
  })
}

// 修改登录密码
export function changePassword(params: BasicParams) {
	return http.request({
		url: '/user/changepwd',
		method: 'POST',
		params
	})
}

// 退出登录
export function logout() {
	return http.request({
		url: '/user/logout',
		method: 'POST'
	})
}
