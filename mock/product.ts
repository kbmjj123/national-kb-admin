import Mock from 'mockjs'
import { resultSuccess } from './_util'
import { MockMethod } from 'vite-plugin-mock'

const TARGET_PRODUCT = '/api/product'

export default [
	{
    url: `${TARGET_PRODUCT}/list`,
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess([])
    },
  },
	{
    url: `${TARGET_PRODUCT}/info`,
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess({})
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
]