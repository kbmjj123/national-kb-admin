import mockjs from 'mockjs'
import { resultSuccess, resultWrapListSuccess } from './_util'
import { MockMethod } from 'vite-plugin-mock'

const TARGET_CATEGORY = '/api/category'

// 随机生成一个嵌套的分类列表
function generateCategoryList() {
	return Array.from({ length: mockjs.Random.natural(10, 15) }, () => ({
		id: mockjs.Random.guid(),
		name: mockjs.Random.cword(2, 4),
		children: Array.from({ length: mockjs.Random.natural(4, 8) }, () => ({
			id: mockjs.Random.guid(),
			name: mockjs.Random.cword(2, 4),
			children: Array.from({ length: mockjs.Random.natural(2, 5) }, () => ({
				id: mockjs.Random.guid(),
				name: mockjs.Random.cword(2, 4),
				children: []
			}))
		}))
	}))
}

export default [
	{
		url: `${TARGET_CATEGORY}/list`,
		method: 'get',
		timeout: 1000,
		response: () => resultWrapListSuccess(generateCategoryList())
	},
	{
		
	}
] as MockMethod[]