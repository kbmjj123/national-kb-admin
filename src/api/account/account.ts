import { http } from '@/utils/http'
import { BasicParams, BasicPageParams, ArrayResponseModel, StringOrBooleanResponseModel } from '../types'

export enum AccountStatus {
	ALL = 0,
	ENABLED = 1,
	DISABLED = 2,
	CANCELED = 3
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
	accountStatus: AccountStatus
}

// 获取账号列表
export function getAccountListList(params: BasicPageParams): Promise<ArrayResponseModel<AccountType>>{
	return http.request({
		url: '/account/list',
		method: 'get',
		data: params
	})
}

// 禁用账号
export function disabledAccount(params: BasicParams): Promise<StringOrBooleanResponseModel>{
	return http.request({
		url: `/account/disabled/${params['id']}`,
		method: 'post',
		data: params
	})
}

// 启用账号
export function enabledAccount(params: BasicParams): Promise<StringOrBooleanResponseModel>{
	return http.request({
		url: `/account/enabled/${params['id']}`,
		method: 'post',
		data: params
	})
}