import type { App } from 'vue'

/**
 * 对外提供的全局组件注册的动作
*/
export function setupGlobalComponents(app: App) {
	const components = import.meta.glob('./**/*.ts', { eager: true })
	Object.keys(components).forEach(item => {
		if(components[item]){
			app.component(item, components[item])
		}
	})
}