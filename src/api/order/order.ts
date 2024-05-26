import { http } from '@/utils/http'
import type { BasicParams, BasicPageParams, StringOrBooleanResponseModel, ArrayResponseModel, ObjectResponseModel } from '../types'
import { ProductType } from '@/api/product/product.ts'

export type ReceiverType = {
	id: string,
	receiver: string,
	provinceName: string,
	provinceCode: string,
	cityName: string,
	cityCode: string,
	areaName: string,
	areaCode: string,
	streetName: string,
	streetCode: string,
	address: string
}

export type BuyerType = {
	id: string,
	name: string,
	avatar?: string,
	account: string,
}

export type LogisticsType = {
	logisticsNo: string,
	company: string,
	logisticsList?: Array<{}>
}

// 从商品类型中捞一些属性作为订单中的商品类型
export type OrderProductType = Pick<ProductType, 'id' | 'name' | 'masterPicture' | 'slug' | 'slugTarget' | 'marketPrice' | 'price'
> & {
	quantity: number,
	amount: number
}

export interface OrderType extends BasicParams {
	id: string,
	orderNo: string,
	createTime: string,
	buyer: BuyerType,
	receiver: ReceiverType,
	orderAmount: number,
	payAmount: number,
	orderStatus: OrderStatusType,
	productList: Array<OrderProductType>
}

export interface OrderDetailType extends OrderType {
	payTime?: string,
	cancelTime?: string,
	deliveryTime?: string,
	receiveTime?: string,
	finishTime?: string,
	writeOffTime?: string,
	deliveryInfo: LogisticsType
}

export enum OrderStatusType {
	WAIT_TO_PAY = 1,			// 待付款
	WAIT_TO_DELIVERY = 2,	// 待发货
	WAIT_TO_RECEIVE = 3,	// 待收货
	FINISH = 4,						// 已完成
	CANCELED = 5,					// 已取消
}

// 订单可操作按钮
export enum OrderOptType {
	DELIVERY = 1,		// 订单发货
	WRITE_OFF = 2,	// 核销
	CANCEL = 3,			// 取消订单
	DETAIL = 4,			// 订单详情
	LOGISTICS = 5,	// 物流轨迹
	PRINT = 6,			// 订单打印
}

// 获取订单列表
export function getOrderList(params: BasicPageParams): Promise<ArrayResponseModel<OrderType>> {
	return http.request({
		url: '/order/list',
		method: 'get',
		data: params
	})
}

// 获取订单详情
export function getOrderDetail(id: string): Promise<ObjectResponseModel<OrderDetailType>> {
	return http.request({
		url: '/order/:id',
		method: 'get',
		data: { id }
	})
}

// 订单发货
export function deliveryOrder(params: BasicParams): Promise<StringOrBooleanResponseModel> {
	return http.request({
		url: '/order/:id/delivery',
		method: 'post',
		data: params
	}, { isShowSuccessMessage: true })
}

// 订单取消
export function cancelOrder(params: BasicParams): Promise<StringOrBooleanResponseModel> {
	return http.request({
		url: '/order/:id/cancel',
		method: 'post',
		data: params
	}, { isShowSuccessMessage: true })
}

// 订单核销
export function writeOffOrder(params: BasicParams): Promise<StringOrBooleanResponseModel> {
	return http.request({
		url: '/order/:id/write-off',
		method: 'post',
		data: params
	})
}

// 查看订单物流轨迹
export function browseOrderLogistics(id: string): Promise<ObjectResponseModel<LogisticsType>> {
	return http.request({
		url: '/order/:id/logistics',
		method: 'post',
		data: {id}
	})
}