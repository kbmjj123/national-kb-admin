import { http } from '@/utils/http'

// 登录成功后获取菜单列表
export const getAdminMenus = () => {
	return http.request({
		url: '/menu/list',
		method: 'GET'
	})
}