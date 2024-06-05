import { http } from '@/utils/http'
import type { WrapArrayResponseModel, ObjectResponseModel, BasicParams } from '../types'

interface StasticsItemType {
	total: number,
	dayPercentage: string,
	dayLiftingType: number,
	weekPercentage: string,
	weekLiftingType: number,
	statisticalDimensions: string,
	monthPercentage: string,
	monthLiftingType: number,
	quarterPercentage: string,
	quarterLiftingType: number,
	todayValue: number
}

type DuringTimeStatisticsItem = {
	name: string,
	data: number[]
}

// 获取平台的统计数据
export function getTotalStastisticsInfo(): Promise<WrapArrayResponseModel<StasticsItemType>> {
	return http.request({
		url: '/statistics/all',
		method: 'get'
	})
}

// 平台的折线图统计数据
export function getDuringTimeStastistics(params: BasicParams): Promise<WrapArrayResponseModel<DuringTimeStatisticsItem>> {
	return http.request({
		url: '/statistics/duringTime/analyse',
		method: 'get',
		data: params
	})
}