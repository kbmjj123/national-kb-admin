import { http } from '@/utils/http'
import { BasicParams, BasicPageParams, ArrayResponseModel, StringOrBooleanResponseModel, ObjectResponseModel } from '../types'

export enum AccountStatus {
	ALL = '',
	ENABLED = 'in-used',
	DISABLED = 'forbidden',
	CANCELED = 'cancel'
}

export type AccountType = {
	id: string,
	account: string,
	name: string,
	avatar: string,
	area: string,
	createTime: string,
	lastLoginTime: string,
	lastLoginIp: string,
	state: AccountStatus
}

// 获取账号列表
export function getAccountList(params: BasicPageParams): Promise<ArrayResponseModel<AccountType>>{
	return http.request({
		url: '/account/list',
		method: 'get',
		params: params
	})
}

/**
 * 获取用户信息
*/
export const getAccountInfo = (id: string): Promise<ObjectResponseModel<AccountType>> => {
	return http.request({
		url: `/account/info/${id}`,
		method: 'get'
	})
}
/**
 * 切换账号状态
*/
export function toggleAccountState(id: string, params: BasicParams): Promise<ObjectResponseModel<AccountType>>{
	return http.request({
		url: `/account/${id}/toggleAccountState`,
		method: 'post',
		data: params
	})
}
