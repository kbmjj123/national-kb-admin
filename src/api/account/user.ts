import { http } from '@/utils/http'

export function getUserInfo(params) {
  return http.request({
    url: '/login',
    method: 'POST',
    params,
  })
}

export function login() {}

export function changePassword() {}

export function logout() {}
