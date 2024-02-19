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
export interface ObjectResonseModel<T> extends BasicResponseModel {
  data: T
}

//? 列表类型响应结果
export interface ArrayResonseModel<T> extends BasicResponseModel {
  data: {
    list: Array<T>
    total: number
    pageIndex: number
  }
}

// 对于分页加载的参数类型
export type BasicPageParams = {
  pageIndex: number
  pageSize: number
  total: number
}
