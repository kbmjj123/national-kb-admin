const STATUS_MSG_MAP = {
  401: '用户没有权限（令牌、用户名、密码错误）!',
  403: '用户得到授权，但是访问是被禁止的。!',
  404: '网络请求错误，未找到该资源!',
  405: '网络请求错误，请求方法未允许!',
  408: '网络请求超时',
  500: '服务器错误,请联系管理员!',
  501: '网络未实现',
  502: '网络错误',
  503: '服务不可用，服务器暂时过载或维护!',
  504: '网络超时',
  505: 'http版本不支持该请求!',
}
// 对外提供的统一网络状态检测方法
export function checkStatus(status: number, message: string): void {
  debugger
	const $message = window['$message']
  if (400 === status) {
    $message.error(message)
  } else {
    $message.console.error(STATUS_MSG_MAP[status])
  }
}
