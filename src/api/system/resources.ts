import { http } from '@/utils/http'
import type { WrapArrayResponseModel } from '../types'
import { KeyValue } from '/#/common'


// 获取所有的物流公司集合
export function getLogisticsCompany(): Promise<WrapArrayResponseModel<KeyValue>>{
	return http.request({
		url: '/resources/logisticsCompany',
		method: 'get',
		data: {}
	})
}