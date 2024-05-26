import mockjs from 'mockjs'
import { resultSuccess, resultWrapListSuccess } from './_util'
import { MockMethod } from 'vite-plugin-mock'
import LogisticsCompany from './logistics_company.json'

const RESOURCES_TARGET = '/api/resources'

export default [
	{
		url: `${RESOURCES_TARGET}/logisticsCompany`,
		method: 'get',
		response: () => resultWrapListSuccess(LogisticsCompany)
	}
] as MockMethod[]