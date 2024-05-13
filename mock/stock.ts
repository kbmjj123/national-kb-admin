import mockjs from 'mockjs'
import { resultSuccess, resultListSuccess } from './_util'
import { MockMethod } from 'vite-plugin-mock'

const TARGET_STOCK = '/api/stock'

const generateStock = (detailFlag?: boolean) => {
	let stockInfo = {
		id: mockjs.Random.guid(),
		name: mockjs.Random.cword(),
		productLogo: mockjs.Random.image('100x100', mockjs.Random.color(), mockjs.Random.color(), 'png', mockjs.Random.cword(2, 4)),
		totalStock: mockjs.Random.integer(0, 99999),
		occupiedStock: mockjs.Random.integer(0, 9999),
		lockStock: mockjs.Random.integer(0, 9999),
	}
	return stockInfo
}

const generateStockList = (num: number) => {
	return Array.from({ length: num }, () => generateStock())
}

export default [
	// 获取库存汇总信息
	{
		url: `${TARGET_STOCK}/summary`,
		method: 'get',
		response: () => resultSuccess({

		})
	},
	// 获取商品库存列表信息
	{
		url: `${TARGET_STOCK}/list`,
		method: 'get',
		response: () => resultListSuccess(generateStockList(20), 87, 1)
	},
	// 获取库存变动详情
	{
		url: `${TARGET_STOCK}/:id`,
		method: 'get',
		response: () => resultSuccess({})
	}
] as MockMethod[]