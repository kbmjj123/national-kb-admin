import { http } from '@/utils/http'
import { BasicParams, BasicPageParams, StringOrBooleanResponseModel, ArrayResponseModel, ObjectResponseModel } from '../types'

export type ProductParams = {
	key: string,
	values: {
		id?: string,
		name: string,
		categoryId?: string
	}[]
}

export type ProductType = {
	id: string,
	name: string,
	slug: string,
	category: string,
	masterPicture: string,
	descPic: string[],
	params: ProductParams[],
	detailContent: string,
	price: string,
	activityPrice: number,
	remark: string
}

// 发布/编辑商品信息
export function publishOrEdit(params: ProductType): Promise<StringOrBooleanResponseModel>{
	return http.request({
		url: '/product/publish',
		method: 'post',
		data: params
	})
}

// 获取商品信息
export function getProductInfo(id: string): Promise<ObjectResponseModel<ProductType>>{
	return http.request({
		url: '/product/:id',
		data: {id},
		method: 'get'
	})
}

// 分页获取商品列表
export function getProductList(params: BasicPageParams): Promise<ArrayResponseModel<ProductType>> {
	return http.request({
		url: '/product/list',
		data: params,
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