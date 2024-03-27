import type { Router, RouteLocationRaw } from 'vue-router'
import { useRouter } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'
import { RedirectName } from '@/router/constant'

import { isString } from '@/utils/is'
import { unref } from 'vue'

// 自定义一类型，将RouteLocationRaw类型中的path替换为PageEnum枚举
export type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & { path: PageEnum }

// 以下是定义的统一跳转时的异常捕获动作
const handleError = (e: Error) => {
	console.error(e)
}

// 统一的页面切换
export const useGo = (_router?: Router) => {
	let router: Router = !_router ? useRouter() : _router
	const { push, replace } = router
	const go = (opt: PageEnum | RouteLocationRawEx | string = PageEnum.BASE_HOME, isReplace = false) => {
		if(!opt) return
		if(isString(opt)){
			isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError)
		} else {
			const o = opt as RouteLocationRaw
			isReplace ? replace(o).catch(handleError) : push(o).catch(handleError)
		}
	}
	return go
}

// 重定向当前页面
export const useRedo = (_router?: Router) => {
	let router: Router = !_router ? useRouter() : _router
	const { push, currentRoute } = router
	const { query, params = {}, name, fullPath } = unref(currentRoute.value)
	const redo = (): Promise<boolean> => {
		return new Promise(resolve => {
			if(name === RedirectName) {
				resolve(false)
				return
			}
			if(name && Object.keys(params).length > 0){
				params['_redirect_type'] = 'name'
				params['path'] = String(name)
			}else {
				params['_redirect_type'] = 'path'
				params['path'] = fullPath
			}
			push({
				name: RedirectName, params, query
			}).then(() => resolve(true))
		})
		
	}
	return redo
}