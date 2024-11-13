import { http } from '@/utils/http'
import type { StringOrBooleanResponseModel, WrapArrayResponseModel } from '../types'
import { KeyValue } from '/#/common'


// 获取所有的物流公司集合
export function getLogisticsCompany(): Promise<WrapArrayResponseModel<KeyValue>> {
	return http.request({
		url: '/resources/logisticsCompany',
		method: 'get',
		data: {}
	})
}

// 文件上传
export const manualUploadFile = (type: string, file: File | Blob): Promise<StringOrBooleanResponseModel> => {
	return http.uploadFile({
		url: `/file/uploadFile?type=${type}`,
		method: 'put',
	}, {
		name: 'file',
		file
	})
}