import mockjs from 'mockjs'
import { resultSuccess, resultListSuccess } from './_util'
import { MockMethod } from 'vite-plugin-mock'

const TARGET_BRAND = '/api/brand'

// 根据长度，随机生成一个对应长度的数组
function generateBrandList(length = 20) {
	return Array.from({ length }, () => ({
		id: mockjs.Random.guid(),
		name: mockjs.Random.cword(2, 4)
	}))
}

export default [
	{
		url: `${TARGET_BRAND}/list`,
		method: 'get',
		timeout: 1000,
		response: () => {
			return resultListSuccess(generateBrandList(), 50, 1)
		}
	},
	{
		url: `${TARGET_BRAND}`,
		method: 'post',
		response: () => resultSuccess(true)
	},
	{
		url: `${TARGET_BRAND}/:id`,
		method: 'put',
		response: () => {
			return resultSuccess(true)
		}
	},
	{
		url: `${TARGET_BRAND}/delete`,
		method: 'delete',
		response: () => {
			return resultSuccess(true)
		}
	}
] as MockMethod[]