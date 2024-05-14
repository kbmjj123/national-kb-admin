import mockjs from 'mockjs'
import { resultSuccess } from './_util'
import { MockMethod } from 'vite-plugin-mock'

const TARGET_File = '/api/file'

export default [
	{
		url: `${TARGET_File}/upload`,
		method: 'put',
		response: () => resultSuccess({
			id: mockjs.Random.guid(),
			name: mockjs.Random.word(2, 30),
			status: 'finished',
			url: mockjs.Random.image('100x100', 
			mockjs.Random.color(), 
			mockjs.Random.color(), 
			'png', 
			mockjs.Random.cword(2, 5))
		})
	}
] as MockMethod[]