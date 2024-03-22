import Mock from 'mockjs'
import { resultSuccess } from './_util'
import { MockMethod } from 'vite-plugin-mock'

const token = Mock.Random.string('upper', 32, 32)

export default [
  {
    url: '/api/user/login',
    timeout: 1000,
    method: 'post',
    response: () => {
      return resultSuccess({ token })
    },
  },
	{
		url: '/api/user/info',
		timeout: 1000,
		method: 'get',
		response: () => resultSuccess({
			username: 'kbmjj123',
			avatar: Mock.Random.image('200x200', '#02adea', 'Koby'),
			info: {
				name: 'Koby',
  			email: 'kbmjj123@gmail.com',
  			phone: '13728009642'
			}
		})
	}
] as MockMethod[]
