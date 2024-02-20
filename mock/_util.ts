import Mock from 'mockjs'

export function resultSuccess(data: any, { message = '操作成功!' } = {}) {
  return Mock.mock({
    status: 0,
    data,
    message,
  })
}
