import { http } from '@/utils/http'
import { BasicParams, BasicPageParams } from '../types'

export type ProductType = {
	id: string,
	name: string,
	slug: string,
	masterPic: string,
	descPic: string[],
	detailContent: string,
	price: number,
	activityPrice: number,
	remark: string
}

// 发布/编辑商品信息
export function publishOrEdit(params: ProductType): Promise<{}>{
	return http.request({
		url: '/product',
		method: 'post',
		data: params
	})
}

// 获取商品信息
export function getProductInfo(id: string): Promise<ProductType>{
	return http.request({
		url: '/product/:id',
		data: {id},
		method: 'get'
	})
}

// 分页获取商品列表
export function getProductList(params: BasicPageParams): Promise<ProductType> {
	return http.request({
		url: '/product/list',
		data: params,
		method: 'get'
	})
}

// 商品上下架
export function upOrDownShelves(params: BasicParams): Promise<{}>{
	return http.request({
		url: '/product/upOrDownShelves',
		data: params,
		method: 'post'
	})
}