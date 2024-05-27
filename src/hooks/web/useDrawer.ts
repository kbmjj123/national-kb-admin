import { ref, defineComponent, h } from 'vue'
import { useLoadingBar } from 'naive-ui'
import DrawerArea from '@/components/DrawerArea'

export const useDrawer = (componentPath: string, emits: any) => {
	const showDrawerFlag = ref(false)
	const component = ref(null)
	const props = ref({})
	const loadingBar = useLoadingBar()

	const showDetail = async (componentProps) => {
		try{
			loadingBar.start()
			component.value = (await import(componentPath)).default
			props.value = componentProps
			showDrawerFlag.value = true
			loadingBar.finish()
		}catch(error){
			loadingBar.error()
		}
	}
	const hideDetail = () => {
		showDrawerFlag.value = false
	}
	const DrawerWrapper = defineComponent({
		setup() {
			return () => h(DrawerArea, {
				modelValue: showDrawerFlag.value,
				'onUpdate:modelValue': (value) => {
					showDrawerFlag.value = value
				},
				title: '标题'
			}, {
				default: () => component.value ? h(component.value, props.value) : null
			})
		}
	})
	return {
		showDetail, hideDetail, DrawerWrapper
	}
}