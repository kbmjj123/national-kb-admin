import { http } from '@/utils/http'
import { BasicParams, BasicPageParams, StringOrBooleanResponseModel, ArrayResponseModel, ObjectResponseModel } from '../types'

export type ProductParams = {
	key: string,
	values: string[]
}

export type ProductType = {
	id: string,
	productName: string,
	slug: string,
	slugTarget?: string,
	cates: string[],
	masterPicture: string,
	descPic: string[],
	paramsList: ProductParams[],
	detailContent: string,
	price: string,
	marketPrice: string,
	remark: string
}

// 发布/编辑商品信息
export function publishOrEdit(params: ProductType): Promise<StringOrBooleanResponseModel>{
	return http.request({
		url: '/product/publish',
		method: 'put',
		data: params
	}, { isShowSuccessMessage: true })
}

// 获取商品信息
export function getProductInfo(id: string): Promise<ObjectResponseModel<ProductType>>{
	return http.request({
		url: `/product/${id}`,
		method: 'get'
	})
}

// 分页获取商品列表
export function getProductList(params: BasicPageParams): Promise<ArrayResponseModel<ProductType>> {
	return http.request({
		url: '/product/list',
		params,
		method: 'get'
	})
}

// 商品上下架
export function upOrDownShelves(params: BasicParams): Promise<StringOrBooleanResponseModel>{
	return http.request({
		url: '/product/upOrDownShelves',
		data: params,
		method: 'post'
	})
}

// 检测slug的唯一性
export function detectionUniqueness(slug: string): Promise<StringOrBooleanResponseModel>{
	return http.request({
		url: '/product/slug/check',
		data: { slug },
		method: 'post'
	}, {
		isShowSuccessMessage: true,
		isShowErrorMessage: true
	})
}