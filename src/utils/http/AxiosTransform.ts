/**
 * 当前项目的数据处理类
 */
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios'
import type { RequestOptions } from './types'

export abstract class AxiosTransform {
  //? 请求之前的预处理配置
  beforeRequestHook?: (confit: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig
  //? 请求成功后的数据处理
  transformRequestData?: (res: AxiosResponse, options: RequestOptions) => any
  //? 请求异常处理
  requestCatch?: (e: Error) => Promise<any>
  //? 请求拦截器
  requestInterceptors?: (
    config: InternalAxiosRequestConfig,
    options: RequestOptions,
  ) => InternalAxiosRequestConfig
  //? 响应拦截器
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>
  // 请求之前的拦截器错误处理
  requestInterceptorsCatch?: (e: Error) => void
  // 响应后的拦截器错误处理
  responseInterceptorsCatch?: (e: AxiosError) => void
}
