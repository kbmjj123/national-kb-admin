import { defineStore } from 'pinia'
import { store } from '../index'
import designSetting from '../../settings/designSetting'

const { darkTheme, appTheme, appThemeList } = designSetting

export const useDesignSettingStore = defineStore({
  id: 'app-design-setting',
  state: () => ({
    darkTheme,
    appTheme,
    appThemeList
  }),
  getters: {
    getDarkTheme(): boolean {
      return this.darkTheme
    },
    getAppTheme(): string {
      return this.appTheme
    },
    getAppThemeList(): string[] {
      return this.appThemeList
    }
  }
})

export function useDesignSetting() {
  return useDesignSettingStore(store)
}