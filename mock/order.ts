import mockjs from 'mockjs'
import { resultSuccess, resultListSuccess } from './_util'
import { MockMethod } from 'vite-plugin-mock'
import { generateProduct } from './product'

const ORDER_TARGET = '/api/order'

const generateOrder = (detailFlag?: boolean) => {
	let orderInfo = {
		id: mockjs.Random.guid(),
		createTime: mockjs.Random.datetime(),
		orderNo: mockjs.Random.natural(100000000000, 999999999999),
		orderAmount: mockjs.Random.float(1, 10000, 0, 2),
		payAmount: mockjs.Random.float(1, 10000, 0, 2),
		orderStatus: mockjs.Random.natural(1, 5),
		productList: Array.from({ length: mockjs.Random.natural(1, 5) }, () => generateProduct(false)),
		buyerInfo: {
			id: mockjs.Random.guid(),
			name: mockjs.Random.cword(2, 4),
			avatar: mockjs.Random.dataImage('80x80', mockjs.Random.cword(2, 4))
		}
	}
	if(detailFlag){
		orderInfo['cancelTime'] = mockjs.Random.datetime()
		orderInfo['payTime'] = mockjs.Random.datetime()
		orderInfo['deleveryTime'] = mockjs.Random.datetime()
		orderInfo['finishTime'] = mockjs.Random.datetime()
		orderInfo['writeOffTime'] = mockjs.Random.datetime()
		orderInfo['deliveryInfo'] = {
			deliveryCompany: mockjs.Random.cword(2, 6),
			deliveryNo: mockjs.Random.string('upper', 2) + mockjs.Random.integer(100000000, 9999999999)
		}
	}
	return orderInfo
}

const generateOrderList = (num: number) => {
	return Array.from({ length: num }, () => generateOrder())
}

export default [
	// 获取订单列表
	{
		url: `${ORDER_TARGET}/list`,
		method: 'get',
		response: () => resultListSuccess(generateOrderList(20), 60, 1)
	},
	// 获取订单详情
	{
		url: `${ORDER_TARGET}/:id`,
		method: 'get',
		response: () => resultSuccess(generateOrder(true))
	},
	// 订单发货
	{
		url: `${ORDER_TARGET}/:id/delivery`,
		method: 'post',
		response: () => resultSuccess('发货成功')
	},
	// 订单取消
	{
		url: `${ORDER_TARGET}/:id/cancel`,
		method: 'post',
		response: () => resultSuccess('订单取消成功')
	},
	// 订单核销
	{
		url: `${ORDER_TARGET}/:id/write-off`,
		method: 'post',
		response: () => resultSuccess('订单核销成功')
	},
	// 查看订单物流轨迹
	{
		url: `${ORDER_TARGET}/:id/logistics`,
		method: 'post',
		response: () => resultSuccess({
			logisticsNo: `sf${mockjs.Random.string('number', 8)}`,
			company: '顺丰快递',
			logisticsList: []
		})
	}
] as MockMethod[]