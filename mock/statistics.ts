import mockjs from 'mockjs'
import { resultSuccess, resultWrapListSuccess } from './_util'
import { MockMethod } from 'vite-plugin-mock'

const TARGET_STATISTICS = '/api/statistics'

// 生成首页的统计数据
const generateHomeStatisticsInfo = () => ([
	{
		key: 'visits',
		values: {
			total: mockjs.Random.natural(10000, 9999999),
			dayPercentage: `${mockjs.Random.natural(0, 100)}%`,
			dayLiftingType: 1,
			weekPercentage: `${mockjs.Random.natural(0, 100)}%`,
			weekLiftingType: 0,
			statisticalDimensions: '日',
			todayValue: mockjs.Random.natural(100, 9999)
		}
	},
	{
		key: 'sales',
		values: {
			total: mockjs.Random.natural(10000, 99999999),
			statisticalDimensions: '周',
			monthPercentage: `${mockjs.Random.natural(0, 100)}%`,
			monthLiftingType: 1,
			weekPercentage: `${mockjs.Random.natural(0, 100)}%`,
			weekLiftingType: 0,
			todayValue: mockjs.Random.float(100, 9999)
		}
	},
	{
		key: 'orders',
		values: {
			total: mockjs.Random.natural(10000, 99999999),
			statisticalDimensions: '周',
			monthPercentage: `${mockjs.Random.natural(0, 100)}%`,
			monthLiftingType: 1,
			weekPercentage: `${mockjs.Random.natural(0, 100)}%`,
			weekLiftingType: 0,
			todayValue: mockjs.Random.natural(100, 9999)
		}
	},
	{
		key: 'deals',
		values: {
			total: mockjs.Random.natural(10000, 99999999),
			statisticalDimensions: '月',
			monthPercentage: `${mockjs.Random.natural(0, 100)}%`,
			monthLiftingType: 1,
			quarterPercentage: `${mockjs.Random.natural(0, 100)}%`,
			quarterLiftingType: 0,
			todayValue: mockjs.Random.natural(100, 9999)
		}
	},

])
// 生成首页折线图数据
const generateChartInfo = (days: number) => ([
	{
		name: 'totalVisits',
		data: Array.from({ length: days }, () => mockjs.Random.natural(100, 9999))
	},
	{
		name: 'actives',
		data: Array.from({ length: days }, () => mockjs.Random.natural(100, 9999))
	},
	{
		name: 'jumpOuts',
		data: Array.from({ length: days }, () => mockjs.Random.float(0, 100))
	},
	{
		name: 'leaves',
		data: Array.from({ length: days }, () => mockjs.Random.float(0, 100))
	}
])

export default [
	// 获取首页工作台的数据统计信息
	{
		url: `${TARGET_STATISTICS}/all`,
		method: 'get',
		response: resultSuccess(generateHomeStatisticsInfo())
	},
	// 获取首页折线图统计数据
	{
		url: `${TARGET_STATISTICS}/duringTime/analyse`,
		method: 'get',
		response: resultWrapListSuccess(generateChartInfo(30))
	}
] as MockMethod[]