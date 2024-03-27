import { computed } from 'vue'
import { useDesignSettingStore } from '@/store/modules/designSetting'

export const useDesignSetting = () => {
	const designStore = useDesignSettingStore()
	const getDarkTheme = computed(() => designStore.darkTheme)
	const getAppTheme = computed(() => designStore.appTheme)
	const getAppThemeList = computed(() => designStore.getAppThemeList)
	return {
		getDarkTheme,
		getAppTheme,
		getAppThemeList
	}
}