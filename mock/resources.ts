import mockjs from 'mockjs'
import { resultSuccess, resultListSuccess } from './_util'
import { MockMethod } from 'vite-plugin-mock'
import LogisticsCompany from './logistics_company.json'

const RESOURCES_TARGET = '/api/resources'

export default [
	{
		url: `${RESOURCES_TARGET}/logisticsCompany`,
		method: 'get'
	}
] as MockMethod[]