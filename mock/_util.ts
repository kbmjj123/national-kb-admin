import Mock from 'mockjs'

export function resultSuccess<T>(
	data: boolean | string | null | object,
	{ message = '操作成功!' } = {},
) {
	return Mock.mock({
		status: 0,
		data,
		message,
	})
}

export function resultListSuccess<T>(data: Array<T>, total: number, pageIndex: number, { message = '操作成功' } = {}) {
	return Mock.mock({
		status: 0,
		data: {
			list: data,
			total,
			pageIndex
		},
		message
	})
}

export function resultWrapListSuccess<T>(data: Array<T>, { message = '操作成功' } = {}) {
	return Mock.mock({
		status: 0,
		message: message,
		data: data
	})
}

export function resultFailed<T>(
	data: boolean | string | null | object | Array<T>,
	{ message = '操作失败!' } = {},
) {
	return Mock.mock({
		status: -1,
		data,
		message
	})
}