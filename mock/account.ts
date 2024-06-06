import mockjs from 'mockjs'
import { resultSuccess, resultListSuccess } from './_util'
import { MockMethod } from 'vite-plugin-mock'

const TARGET_ACCOUNT = '/api/account'

// 生成随机账号列表
const generateAccountList = (num: number) => {
	return Array.from({ length: num }, () => ({
		id: mockjs.Random.guid(),
		account: mockjs.Random.word(6, 12),
		name: mockjs.Random.cword(2, 4),
		avatar: mockjs.Random.image('100x100', mockjs.Random.color(), mockjs.Random.color(), 'png', mockjs.Random.cword(2, 3)),
		area: mockjs.Random.county(true),
		createTime: mockjs.Random.date(),
		lastLoginTime: `${mockjs.Random.date()} ${mockjs.Random.time()}`,
		lastLoginIp: Array.from({ length: 4 }, () => mockjs.Random.natural(1, 255)).join('.'),
		accountStatus: mockjs.Random.natural(0, 1)
	}))
}

export default [
	// 获取账号列表
	{
		url: `${TARGET_ACCOUNT}/list`,
		method: 'get',
		response: () => resultListSuccess(generateAccountList(20), 50, 1)
	},
	// 禁用账号
	{
		url: `${TARGET_ACCOUNT}/disabled/:id`,
		method: 'post',
		response: () => resultSuccess('')
	},
	// 启用账号
	{
		url: `${TARGET_ACCOUNT}/enabled/:id`,
		method: 'post',
		response: () => resultSuccess('')
	}
] as MockMethod[]