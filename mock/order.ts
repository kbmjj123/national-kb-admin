import mockjs from 'mockjs'
import { resultSuccess, resultListSuccess } from './_util'
import { MockMethod } from 'vite-plugin-mock'
import { generateProduct } from './product'
import logisticsTrack from './logistics_track.json'

const ORDER_TARGET = '/api/order'

const generateOrder = (detailFlag?: boolean) => {
	let orderInfo = {
		id: mockjs.Random.guid(),
		createTime: mockjs.Random.datetime(),
		orderNo: mockjs.Random.natural(100000000000, 999999999999),
		orderAmount: mockjs.Random.float(1, 10000, 0, 2),
		payAmount: mockjs.Random.float(1, 10000, 0, 2),
		amount: mockjs.Random.float(1, 10000, 0, 2),
		quantity: mockjs.Random.natural(1, 10),
		orderStatus: mockjs.Random.natural(1, 5),
		productList: Array.from({ length: mockjs.Random.natural(1, 5) }, () => generateProduct(false)),
		buyerInfo: {
			id: mockjs.Random.guid(),
			name: mockjs.Random.cword(2, 4),
			avatar: mockjs.Random.image('300x300', mockjs.Random.color(), mockjs.Random.color(), 'png', mockjs.Random.cword(2, 4)),
		}
	}
	if(detailFlag){
		orderInfo['cancelTime'] = mockjs.Random.datetime()
		orderInfo['payTime'] = mockjs.Random.datetime()
		orderInfo['deliveryTime'] = mockjs.Random.datetime()
		orderInfo['finishTime'] = mockjs.Random.datetime()
		orderInfo['writeOffTime'] = mockjs.Random.datetime()
		orderInfo['deliveryInfo'] = logisticsTrack
		orderInfo['receiveInfo'] = {
			id: mockjs.Random.guid(),
			receiver: mockjs.Random.cword(2, 4),
			phone: '13728009642',
			provinceName: '广东省',
			provinceCode: '',
			cityName: '广州市',
			cityCode: '',
			areaName: '天河区',
			areaCode: '',
			streetName: '五山街道',
			streetCode: '',
			address: '龙怡路117号银汇大厦26楼'
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
		response: () => resultSuccess(logisticsTrack)
	},
	// 获取可待核销的订单列表
	{
		url: `${ORDER_TARGET}/write-off/list`,
		method: 'get',
		response: () => resultListSuccess(generateOrderList(2), 2, 1)
	}
] as MockMethod[]