import mockjs from 'mockjs'
import { resultSuccess, resultListSuccess } from './_util'
import { MockMethod } from 'vite-plugin-mock'

const TARGET_ACCOUNT = '/api/account'

// 生成随机用户列表
const generateAccountList = (num: number) => {
	return Array.from({ length: num }, () => ({
		id: mockjs.Random.guid(),
		name: mockjs.Random.cword(2, 4),
		avatar: mockjs.Random.image('100x100', mockjs.Random.color(), mockjs.Random.color(), 'png', mockjs.Random.cword(2, 3)),
		createTime: mockjs.Random.date(),
		lastLoginTime: `${mockjs.Random.date()} ${mockjs.Random.time()}`,
		lastLoginIp: Array.from({ length: 4 }, () => mockjs.Random.natural(1, 255)).join('.')
	}))
}

export default [
	// 获取用户列表
	{
		url: `${TARGET_ACCOUNT}/list`,
		method: 'get',
		response: () => resultListSuccess(generateAccountList(20), 50, 1)
	},
	// 禁用用户
	{
		url: `${TARGET_ACCOUNT}/disabled/:id`,
		method: 'post',
		response: () => resultSuccess('')
	},
	// 启用用户
	{
		url: `${TARGET_ACCOUNT}/enabled/:id`,
		method: 'post',
		response: () => resultSuccess('')
	}
] as MockMethod[]