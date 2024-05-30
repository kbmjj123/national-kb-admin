import { ref, type Ref } from 'vue'

type LoadingResult<T> = {
	loading: Ref<boolean>,
	execute: Function,
	result: Ref<T>,
	error?: Ref<any>
}

export const useLoading = <T>(promise: (params: any) => Promise<T>): LoadingResult<T> => {
	const loading = ref(false)
	const result = ref<T>() as Ref<T>
	const error = ref()
	const execute = (params: any, transformBefore?: Function) => {
		loading.value = true
		promise(params).then(res => {
			// 在数据存储之前进行提前转换动作
			transformBefore && transformBefore(res)
			result.value = res
		}).catch(err => {
			error.value = err
		}).finally(() => {
			loading.value = false
		})
	}
	return {
		loading, execute, result, error
	}
}