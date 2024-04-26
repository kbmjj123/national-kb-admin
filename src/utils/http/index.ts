import { ContentTypeEnum, RequestEnum, ResultEnum } from '@/enums/httpEnum'
import { Axios } from './Axios'
import { AxiosTransform } from './AxiosTransform'
import { CreateAxiosOptions, RequestOptions } from './types'
import { deepMerge, isUrl } from '@/utils/index'
import { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { PageEnum } from '@/enums/pageEnum'
import router from '@/router'
import { useGlobSetting } from '@/hooks/setting'
import { isString } from '../is'
import { formatRequestDate, joinTimestamp } from './helper'
import { setObjToUrlParams } from '../urlUtils'

const globSetting = useGlobSetting()
const urlPrefix = globSetting.urlPrefix || ''

const transform: AxiosTransform = {
  //! 请求参数进行处理
  transformRequestData: (res: AxiosResponse<any>, options: RequestOptions) => {
    const {
      isShowMessage = true,
      isShowErrorMessage,
      isShowSuccessMessage,
      successMessageText,
      errorMessageText,
      isTransformResponse,
      isReturnNativeResponse,
    } = options
    //? 是否返回原生响应头
    if (isReturnNativeResponse) {
      return res
    }
    if (!isTransformResponse) {
      return res.data
    }
    const responseData = res.data
    const $dialog = window['$dialog']
    const $message = window['$message']
    if (!responseData) {
      throw new Error('网络请求出错，请稍后重试!')
    }
    const { status, message } = responseData
    const hasSuccess =
      responseData && Reflect.has(responseData, 'status') && status === ResultEnum.SUCCESS
    if (isShowMessage) {
      if (hasSuccess && (successMessageText || isShowSuccessMessage)) {
        $message.success(successMessageText || message || '操作成功!')
      } else if (!hasSuccess && (errorMessageText || isShowErrorMessage)) {
        $message.error(message || errorMessageText || '操作失败!')
      } else if (!hasSuccess) {
        if (options.errorMessageMode === 'modal') {
          $dialog.info({
            title: '温馨提示',
            content: message,
            positiveText: '确定',
            onPositiveClick: () => {},
          })
        } else if (options.errorMessageMode === 'toast') {
          $message.error(message)
        }
      }
    }
    if (status === ResultEnum.SUCCESS) {
      return responseData
    }
    let errorMsg = message
    switch (status) {
      case ResultEnum.ERROR:
        $message.error(errorMsg)
        break
      case ResultEnum.TIMEOUT:
        if (router.currentRoute.value?.name === PageEnum.BASE_LOGIN_NAME) return
        errorMsg = '登录超时，请重新登录!'
        $dialog.warning({
          title: '温馨提示',
          content: '登录信息已失效，请重新登录!',
          positiveText: '重新登录',
          closable: false,
          maskClosable: false,
          onPositiveClick: () => {
            //TODO 清除本地存储相关
            window.location.href = PageEnum.BASE_LOGIN
          },
        })
        break
    }
    throw new Error(errorMsg)
  },
  //! 请求之前处理config
  beforeRequestHook: (config: AxiosRequestConfig, options: RequestOptions): AxiosRequestConfig => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options
    const isUrlStr = isUrl(config.url as string)

    if (!isUrlStr && joinPrefix) {
      config.url = `${urlPrefix}${config.url}`
    }

    if (!isUrlStr && apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }
    const params = config.params || {}
    const data = config.data || false
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data
          config.params = params
        } else {
          config.data = params
          config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          )
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  },
  //! 请求拦截器
  requestInterceptors: (
    config: InternalAxiosRequestConfig,
    options: RequestOptions,
  ): InternalAxiosRequestConfig => {
    return config
  },
  responseInterceptorsCatch: (e: Error) => {},
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new Axios(
    deepMerge(
      {
        timeout: 10 * 1000,
        // 接口前缀
        prefixUrl: '/api',
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'none',
          // 接口地址
          apiUrl: globSetting.apiUrl,
          // 接口拼接地址
          urlPrefix: urlPrefix,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
        },
        withCredentials: false,
      },
      opt || {},
    ),
  )
}

export const http = createAxios()
