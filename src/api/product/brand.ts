import { http } from '@/utils/http'
import type { BasicParams, BasicPageParams, StringOrBooleanResponseModel, ArrayResponseModel } from '../types'

export interface BrandType extends BasicParams {
	id?: string,
	name: string
}

// 新增品牌
export function addBrand(params: BrandType): Promise<StringOrBooleanResponseModel>{
	return http.request({
		url: '/brand',
		method: 'post',
		data: params
	})
}

// 编辑品牌
export function editBrand(params: BrandType): Promise<StringOrBooleanResponseModel>{
	return http.request({
		url: '/brand/:id',
		data: params
	})
}
// 获取品牌列表
export function getBrandList(params: BasicPageParams): Promise<ArrayResponseModel<BrandType>>{
	return http.request({
		url: '/brand',
		data: params
	})
}

// 删除品牌
export function deleteBrand(id: string): Promise<StringOrBooleanResponseModel>{
	return http.request({
		url: '/brand/:id',
		data: {id}
	})
}