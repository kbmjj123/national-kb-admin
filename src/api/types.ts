// 接口响应基本数据结构
interface BasicResponseModel {
  status: number
  message: string
}
//? 字符串或者布尔类型响应结果
export interface StringOrBooleanResponseModel extends BasicResponseModel {
  data: string | boolean
}

//? 对象类型响应结果
export interface ObjectResponseModel<T> extends BasicResponseModel {
  data: T
}

//? 列表类型响应结果
export interface ArrayResponseModel<T> extends BasicResponseModel {
  data: {
    list: Array<T>
    total: number
    pageIndex: number
  }
}

// 对于分页加载的参数类型
export interface BasicPageParams {
  pageIndex: number
  pageSize: number
  total: number,
	[index: string]: any
}

// 统一设置关于请求参数类型
export interface BasicParams {
	[index: string]: any
}