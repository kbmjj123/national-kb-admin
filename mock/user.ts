import Mock from 'mockjs'
import { resultSuccess } from './_util'
import { MockMethod } from 'vite-plugin-mock'

const token = Mock.Random.string('upper', 32, 32)

export default [
  {
    url: '/api/login',
    timeout: 1000,
    method: 'post',
    response: () => {
      return resultSuccess({ token });
    },
  },
] as MockMethod[]
