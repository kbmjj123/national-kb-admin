import Mock from 'mockjs'
import { resultSuccess, resultFailed } from './_util'
import { MockMethod } from 'vite-plugin-mock'

const TARGET_PRODUCT = '/api/product'

export default [
	// **** 以下是商品的相关接口 ****
	{
    url: `${TARGET_PRODUCT}/list`,
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess([])
    },
  },
	{
    url: `${TARGET_PRODUCT}/:id`,
    timeout: 1000,
    method: 'get',
    response: ({url}) => {
			// 定义正则表达式来匹配路由参数
      const regex = /\/product\/(.*?)(\?|$)/;
      // 使用正则表达式匹配URL
      const match = url.match(regex);
      if (match) {
        // 获取匹配到的参数值
        const id = match[1];
        // 根据:id的值做相应的处理
        // 这里返回一个空数组作为示例
        return resultSuccess(id);
      } else {
        // 如果未匹配到路由参数，返回错误信息或者其他处理
        return resultFailed('请按照协议来传参');
      }
    },
  },
	{
    url: `${TARGET_PRODUCT}/publish`,
    timeout: 1000,
    method: 'post',
    response: () => {
      return resultSuccess([])
    },
  },
] as MockMethod[]