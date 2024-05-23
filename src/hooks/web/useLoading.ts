import { ref, type Ref } from 'vue'

type LoadingResult<T> = {
	loading: Ref<boolean>,
	execute?: Function,
	result: Ref<T>,
	error?: Ref<any>
}

export const useLoading = <T>(promise: Promise<T>): LoadingResult<T> => {
	const loading = ref(false)
	const result = ref<T>() as Ref<T>
	const error = ref()
	const execute = () => {
		loading.value = true
		promise.then(res => {
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