import { http } from '@/utils/http'
import type { BasicParams, ObjectResponseModel, StringOrBooleanResponseModel, WrapArrayResponseModel } from '../types'

export interface CateType extends BasicParams{
	id?: string,
	title: string,
	level: number,
	parentId?: string,
	paramsList?: Array<{key: string, values: string}>
}

export interface ParamType extends CateType{
	params: string[]
}

// 获取所有的分类列表
export function getCategoryList(): Promise<WrapArrayResponseModel<CateType>> {
	return http.request({
		url: '/cate/list',
		method: 'get'
	})
}

// 新增分类
export function addCate(params: CateType): Promise<ObjectResponseModel<CateType>> {
	return http.request({
		url: '/cate',
		method: 'put',
		data: params
	}, { isShowSuccessMessage: true })
}

// 编辑分类
export function editCate(params: CateType): Promise<ObjectResponseModel<CateType>> {
	return http.request({
		url: '/cate/:id',
		method: 'post',
		data: params
	}, { isShowSuccessMessage: true })
}

// 删除分类
export function deleteCate(id: string): Promise<StringOrBooleanResponseModel> {
	return http.request({
		url: `/cate/${id}`,
		method: 'delete',
		data: {id}
	})
}

// 调整分类顺序
export function changeSort(params: BasicParams): Promise<StringOrBooleanResponseModel> {
	return http.request({
		url: '/cate/sort',
		method: 'post',
		data: params
	})
}

// 获取分类下的属性集合
export function getCategoryParams(params: BasicParams): Promise<WrapArrayResponseModel<ParamType>> {
	return http.request({
		url: '/cate/params',
		method: 'get',
		data: params
	})
}