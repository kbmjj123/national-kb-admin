import mockjs from 'mockjs'
import { resultSuccess, resultListSuccess } from './_util'
import { MockMethod } from 'vite-plugin-mock'

const TARGET_STATISTICS = '/api/statistics'

// 生成首页的统计数据
const generateHomeStatisticsInfo = () => {}

export default [
	// 获取首页工作台的数据统计信息
	{
		url: `${TARGET_STATISTICS}/all`,
		method: 'get',
		response: generateHomeStatisticsInfo()
	}
] as MockMethod[]