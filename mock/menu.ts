import Mock from 'mockjs'
import { resultSuccess } from './_util'
import { MockMethod } from 'vite-plugin-mock'

// 构造前端所需要的菜单列表
const MENU_LIST = [
	{
		
	}
]

export default [
	// 登录成功后获取菜单列表
	{
    url: '/api/menu/list',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess(MENU_LIST)
    },
  },
] as MockMethod[]