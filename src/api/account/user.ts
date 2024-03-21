import { http } from '@/utils/http'

// 获取当前登录用户信息
export function getUserInfo() {
	return http.request({
		url: '/userinfo',
		method: 'GET'
	})
}

// 登录动作
export function login(params) {
  return http.request({
    url: '/login',
    method: 'POST',
    params,
  })
}

// 修改登录密码
export function changePassword(params) {
	return http.request({
		url: '/changepwd',
		method: 'POST',
		params
	})
}

// 退出登录
export function logout() {
	return http.request({
		url: '/logout',
		method: 'POST'
	})
}
