import { http } from '@/utils/http'
import type { BasicParams, ObjectResponseModel, StringOrBooleanResponseModel, WrapArrayResponseModel } from '../types'
export interface CateType extends BasicParams{
	id?: string,
	name: string,
	level: number,
	parentId?: string,
}

// 获取所有的分类列表
export function getCategoryList(): Promise<WrapArrayResponseModel<CateType>> {
	return http.request({
		url: '/category/list',
		method: 'get'
	})
}

// 新增分类
export function addCate(params: CateType): Promise<ObjectResponseModel<CateType>> {
	return http.request({
		url: '/category',
		method: 'post',
		data: params
	}, { isShowSuccessMessage: true })
}

// 编辑分类
export function editCate(params: CateType): Promise<ObjectResponseModel<CateType>> {
	return http.request({
		url: '/category/:id',
		method: 'post',
		data: params
	}, { isShowSuccessMessage: true })
}

// 删除分类
export function deleteCate(id: string): Promise<StringOrBooleanResponseModel> {
	return http.request({
		url: '/category/:id',
		method: 'delete',
		data: {id}
	})
}

// 调整分类顺序
export function changeSort(params): Promise<StringOrBooleanResponseModel> {
	return http.request({
		url: '/category/sort',
		method: 'post',
		data: params
	})
}