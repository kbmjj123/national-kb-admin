import type {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { CreateAxiosOptions, RequestOptions, UploadFileParams } from './types'

import axios from 'axios'
import { AxiosCancelManager } from './AxiosCancelManager'
import { isFunction } from '@/utils/is'
import { cloneDeep } from 'lodash-es'
import { ContentTypeEnum } from '@/enums/httpEnum'

export class Axios {
  private axiosInstance: AxiosInstance
  private options: CreateAxiosOptions

  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance
  }

  // 设置通用请求头
  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return
    }
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }

  //? 统一的请求方法
  request<T>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: AxiosRequestConfig = cloneDeep(config)
    const transform = this.getTransform()
    const { requestOptions } = this.options
    const opt: RequestOptions = Object.assign({}, requestOptions, options)
    const { beforeRequestHook, requestCatch, transformRequestData } = transform || {}
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt)
    }
    // @ts-ignore
    conf.requestOptions = opt
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(conf)
        .then((res: AxiosResponse) => {
          const isCancel = axios.isCancel(res)
          if (!isCancel && transformRequestData && isFunction(transformRequestData)) {
            try {
              const ret = transformRequestData(res, opt)
              resolve(ret)
            } catch (err) {
              reject(err || new Error('请求错误!'))
            }
          }
        })
        .catch((e: Error) => {
          if (requestCatch && isFunction(requestCatch)) {
            reject(requestCatch(e))
          }
        })
    })
  }

  //? 重新配置axios
  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) {
      return
    }
    this.createAxios(config)
  }

  //? 上传文件
  uploadFile<T>(config: AxiosRequestConfig, params: UploadFileParams): Promise<T> {
    const formData = new window.FormData()
    const customFilename = params.name || 'file'
    if (params.filename) {
      formData.append(customFilename, params.file, params.filename)
    } else {
      formData.append(customFilename, params.file)
    }
    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key]
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item)
          })
          return
        }
        formData.append(key, params.data![key])
      })
    }
    return this.request({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': ContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true,
      },
    })
  }

  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config)
  }

  private getTransform() {
    const { transform } = this.options
    return transform
  }

  // 设置统一的网络请求拦截器
  private setupInterceptors() {
    const transform = this.getTransform()
    if (!transform) {
      return
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform
    const cancelMag = new AxiosCancelManager()
    this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const {
        headers: { ignoreCancelToken },
      } = config
      const ignoreCancel = ignoreCancelToken
        ? ignoreCancelToken
        : this.options.requestOptions?.ignoreCancelToken
      //? 将当前请求添加到可被cancel的集合中
      !ignoreCancel && cancelMag.addPending(config)
      if (requestInterceptors && isFunction(requestInterceptors)) {
        // @ts-ignore
        config = requestInterceptors(config, this.options)
      }
      return config
    }, requestInterceptorsCatch)
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && cancelMag.removePending(res.config)
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res)
      }
      return res
    }, responseInterceptorsCatch)
  }
}
