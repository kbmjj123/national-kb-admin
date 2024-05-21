import { reactive, inject, onMounted } from 'vue'

export const useRef = (refKey: string, injectFun: string) => {
	const dynamicRefs = reactive({})
	const injectAction = inject(injectFun) as (prop: string, el: HTMLElement) => void
	if (!injectAction) {
		throw new Error('必须传递存在的provide')
	}
	dynamicRefs[refKey] = ref(null)
	onMounted(() => {
		injectAction(refKey, dynamicRefs[refKey]?.value?.$el)
	})
	return dynamicRefs
}