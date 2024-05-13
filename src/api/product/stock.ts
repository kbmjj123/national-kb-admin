import { http } from '@/utils/http'
import type { BasicParams, BasicPageParams, ObjectResponseModel, ArrayResponseModel } from '../types'

export interface StockType {
	id: string,
	name: string,
	productLogo: string,
	totalStock: number,
	occupiedStock: number,
	lockStock: string
}

// 获取库存汇总信息
export const getStockSummary = (): Promise<ObjectResponseModel<any>> => {
	return http.request({
		url: '/stock/summary',
		method: 'get'
	})
}

// 获取商品库存列表信息
export const getStockList = (params: BasicPageParams): Promise<ArrayResponseModel<StockType>> => {
	return http.request({
		url: '/stock/list',
		method: 'get',
		data: params
	})
}

// 获取商品库存变动详情信息
export const getStockDetail = (params: BasicParams): Promise<ObjectResponseModel<StockType>> => {
	return http.request({
		url: '/stock/:id',
		method: 'get',
		data: params
	})
}