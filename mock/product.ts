import mockjs from 'mockjs'
import { resultSuccess, resultFailed, resultListSuccess } from './_util'
import { MockMethod } from 'vite-plugin-mock'

const TARGET_PRODUCT = '/api/product'

export const generateProduct = (detailFlag?: boolean) => {
	let productInfo = {
		id: mockjs.Random.guid(),
		name: mockjs.Random.cword(4, 20),
		category: Array.from({ length: mockjs.Random.natural(1, 3) }, () => mockjs.Random.cword(2, 4)).join('/'),
		slugTarget: 'kb-product-slug',
		slug: `${mockjs.Random.word(3, 8)}`,
		masterPicture: mockjs.Random.image('300x300', mockjs.Random.color(), mockjs.Random.color(), 'png', mockjs.Random.cword(2, 4)),
		price: mockjs.Random.float(0.01, 9999, 0, 2),
		marketPrice: mockjs.Random.float(0.01, 9999, 0, 2)
	}
	if (detailFlag) {
		productInfo['descPic'] = [productInfo.masterPicture, ...Array.from({ length: mockjs.Random.integer(1, 5) }, () => mockjs.Random.image('300x300', mockjs.Random.color(), mockjs.Random.color(), 'jpg', mockjs.Random.cword(2, 4)))]
		productInfo['detailContent'] = Array.from({ length: mockjs.Random.integer(5, 20) }, (index: number) => {
			return index % 3 === 0 ? `<p>${mockjs.Random.cparagraph()}</p>` : `<p><img src="${mockjs.Random.image('500x500', mockjs.Random.color(), mockjs.Random.color(), 'jpg')}" style="width: 100%;"></p>`
		}).join('')
	}
	return productInfo
}

const genreateProductList = (num: number) => {
	return Array.from({ length: num }, () => generateProduct())
}

export default [
	// 获取商品列表
	{
		url: `${TARGET_PRODUCT}/list`,
		timeout: 1000,
		method: 'get',
		response: () => {
			return resultListSuccess(genreateProductList(20), 50, 1)
		},
	},
	// 获取商品详情
	{
		url: `${TARGET_PRODUCT}/:id`,
		timeout: 1000,
		method: 'get',
		response: ({ url }) => {
			// 定义正则表达式来匹配路由参数
			const regex = /\/product\/(.*?)(\?|$)/;
			// 使用正则表达式匹配URL
			const match = url.match(regex);
			if (match) {
				// 获取匹配到的参数值
				const id = match[1];
				// 根据:id的值做相应的处理
				// 这里返回一个空数组作为示例
				return resultSuccess(generateProduct(true));
			} else {
				// 如果未匹配到路由参数，返回错误信息或者其他处理
				return resultFailed('请按照协议来传参');
			}
		},
	},
	// 发布/编辑商品
	{
		url: `${TARGET_PRODUCT}/publish`,
		timeout: 1000,
		method: 'post',
		response: () => {
			return resultSuccess()
		},
	},
	// 上下架商品
	{
		url: `${TARGET_PRODUCT}/sale/:id`,
		method: 'post',
		response: () => resultSuccess()
	}
] as MockMethod[]