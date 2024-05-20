import mockjs from 'mockjs'
import { resultSuccess, resultWrapListSuccess } from './_util'
import { MockMethod } from 'vite-plugin-mock'

const TARGET_CATEGORY = '/api/category'

// 随机生成一个嵌套的分类列表
function generateCategoryList() {
	return Array.from({ length: mockjs.Random.natural(10, 15) }, () => ({
		id: mockjs.Random.guid(),
		name: mockjs.Random.cword(2, 4),
		level: 1,
		children: Array.from({ length: mockjs.Random.natural(4, 8) }, () => ({
			id: mockjs.Random.guid(),
			name: mockjs.Random.cword(2, 4),
			level: 2,
			children: Array.from({ length: mockjs.Random.natural(2, 5) }, () => ({
				id: mockjs.Random.guid(),
				name: mockjs.Random.cword(2, 4),
				level: 3,
				children: []
			}))
		}))
	}))
}
// 生成该分类下的所有的属性集合
function generateCategoryParams() {
	return Array.from({ length: mockjs.Random.natural(1, 3) }, () => ({
		id: mockjs.Random.guid(),
		name: mockjs.Random.cword(2, 4),
		level: mockjs.Random.natural(1, 3),
		params: Array.from({ length: mockjs.Random.natural(1, 10) }, () => mockjs.Random.cword(2, 4))
	}))
}

export default [
	// 获取分类列表
	{
		url: `${TARGET_CATEGORY}/list`,
		method: 'get',
		response: () => resultWrapListSuccess(generateCategoryList())
	},
	// 新增分类
	{
		url: `${TARGET_CATEGORY}`,
		method: 'post',
		response: () => resultSuccess({
			id: mockjs.Random.guid(),
			name: mockjs.Random.cword(2, 4)
		})
	},
	// 编辑分类
	{
		url: `${TARGET_CATEGORY}/:id`,
		method: 'post',
		response: () => resultSuccess({
			id: mockjs.Random.guid(),
			name: mockjs.Random.cword(2, 4)
		})
	},
	// 删除分类
	{
		url: `${TARGET_CATEGORY}/:id`,
		method: 'delete',
		response: () => resultSuccess(true)
	},
	// 调整分类顺序
	{
		url: `${TARGET_CATEGORY}/sort`,
		method: 'post',
		response: () => resultSuccess(true)
	},
	// 获取分类下的属性集合，包括从父节点菜单获取到的
	{
		url: `${TARGET_CATEGORY}/params`,
		method: 'get',
		response: () => resultSuccess(generateCategoryParams())
	}
] as MockMethod[]