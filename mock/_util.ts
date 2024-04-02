import Mock from 'mockjs'

export function resultSuccess<T>(
  data: boolean | string | null | object | Array<T>,
  { message = '操作成功!' } = {},
) {
  return Mock.mock({
    status: 0,
    data,
    message,
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