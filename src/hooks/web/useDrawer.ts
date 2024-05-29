import { ref, shallowRef, defineComponent, h, onMounted, onUnmounted } from 'vue'
import { NDrawer, NDrawerContent } from 'naive-ui'
const showDrawerFlag = ref(false)
const component = shallowRef(null)
const props = ref<ComponentProps>({
	title: ''
})
const componentMap = new Map()

type ComponentProps = {
	title: string,
	[index: string]: any
}

export const useDrawer = () => {
	const showDetail = async (componentPath: string, componentProps: ComponentProps) => {
		try {
			if (componentMap.has(componentPath)) {
				component.value = componentMap.get(componentPath)
			} else {
				const resolvedComponentPath = componentPath.startsWith('@')
					? componentPath.replace('@', '/src')
					: componentPath;
				component.value = (await import(resolvedComponentPath)).default
				componentMap.set(componentPath, component.value)
			}
			props.value = componentProps
			showDrawerFlag.value = true
		} catch (error) {
			console.error(error)
		}
	}
	const hideDetail = () => {
		showDrawerFlag.value = false
	}
	const DrawerWrapper = defineComponent({
		setup() {
			const drawerWidth = ref(window.innerWidth * 0.8)
			const handleResize = () => {
				drawerWidth.value = window.innerWidth * 0.8
			}
			onMounted(() => {
				window.addEventListener('resize', handleResize)
			})
			onUnmounted(() => {
				window.removeEventListener('resize', handleResize)
			})
			return () => h(NDrawer, {
				show: showDrawerFlag.value,
				defaultWidth: drawerWidth.value,
				width: drawerWidth.value,
				resizable: true,
				closeOnEsc: true,
				'onUpdate:show': (value) => {
					showDrawerFlag.value = value
				}
			}, {
				default: () => h(NDrawerContent, {
					title: props.value.title,
					closable: true
				}, {
					default: () => component.value ? h(component.value, { ...props.value, hideDetail }) : null
				})
			})
		}
	})
	return {
		showDetail, hideDetail, DrawerWrapper
	}
}