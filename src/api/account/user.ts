import { http } from '@/utils/http'

export function getUserInfo(params) {
}

export function login(params) {
  return http.request({
    url: '/login',
    method: 'POST',
    params,
  })
}

export function changePassword() {}

export function logout() {}
