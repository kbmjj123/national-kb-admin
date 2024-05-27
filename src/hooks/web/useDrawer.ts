import { ref, defineComponent, h } from 'vue'
import { useLoadingBar, NDrawer } from 'naive-ui'
import DrawerArea from '@/components/DrawerArea'

export const useDrawer = () => {
	const showDrawerFlag = ref(false)
	const component = ref(null)
	const props = ref({})
	// const loadingBar = useLoadingBar()

	const showDetail = async (componentPath: string, componentProps: Record<string, any>) => {
		try {
			// loadingBar.start()
			const resolvedComponentPath = componentPath.startsWith('@')
        ? componentPath.replace('@', '/src')
        : componentPath;
			component.value = (await import(resolvedComponentPath)).default
			props.value = componentProps
			showDrawerFlag.value = true
			console.log('Component loaded and drawer state updated', showDrawerFlag.value); // 调试信息
			// loadingBar.finish()
		} catch (error) {
			console.error(error)
			// loadingBar.error()
		}
	}
	const hideDetail = () => {
		showDrawerFlag.value = false
	}
	const DrawerWrapper = defineComponent({
		setup() {
			return () => h(DrawerArea, {
				show: showDrawerFlag.value,
				'onUpdate:show': (value) => {
					console.info(value)
					showDrawerFlag.value = value
				},
				title: '标题'
			}, {
				default: () => component.value ? h(component.value, { ...props.value, hideDetail }) : null
			})
		}
	})
	return {
		showDetail, hideDetail, DrawerWrapper
	}
}