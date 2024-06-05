import { createProdMockServer } from 'vite-plugin-mock/client'

// 逐一导入您的mock.ts文件
// 如果使用vite.mock.config.ts，只需直接导入文件
// 可以使用 import.meta.glob功能来进行全部导入
import user from './user'
import menu from './menu'
import account from './account'
import order from './order'
import product from './product'
import brand from './brand'
import category from './category'
import stock from './stock'
import file from './file'
import resources from './resources'
import statistics from './statistics'

export function setupProdMockServer() {
  createProdMockServer([
		...user,
		...menu,
		...account,
		...order,
		...product,
		...brand,
		...category,
		...stock,
		...file,
		...resources,
		...statistics
	])
}
