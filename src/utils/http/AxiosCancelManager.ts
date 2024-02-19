import axios, { AxiosRequestConfig, Canceler } from 'axios'
import qs from 'qs'
import { isFunction } from '@/utils/is/index'

let pendingMap = new Map<string, Canceler>()

export const getPendingUrl = (config: AxiosRequestConfig) =>
  [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join('&')

export class AxiosCancelManager {
  // 添加请求
  addPending(config: AxiosRequestConfig): void {
    this.removePending(config)
    const url = getPendingUrl(config) // 获取当前请求的组装url地址
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // 如果之前没有该请求记录，则添加到map中
          pendingMap.set(url, cancel)
        }
      })
  }
  // 清空所有的请求pending
  removeAllPending(): void {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel()
    })
    pendingMap.clear()
  }
  // 移除某个请求
  removePending(config: AxiosRequestConfig): boolean {
    const url = getPendingUrl(config)
    if (pendingMap.has(url)) {
      // 以前有请求过且被缓存下来的
      const cancel = pendingMap.get(url)
      cancel && isFunction(cancel) && cancel(url)
      pendingMap.delete(url)
    }
    return false
  }
  //重置整个请求Map对象
  reset(): void {
    pendingMap = new Map<string, Canceler>()
  }
}
