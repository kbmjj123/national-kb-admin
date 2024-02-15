import { ConfigProviderProps, createDiscreteApi, darkTheme, lightTheme } from 'naive-ui'

export function setupNaiveDiscreteApi() {
  const themeRef = ref<'light' | 'dark'>('light')
  const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
    theme: themeRef.value === 'light' ? lightTheme : darkTheme,
  }))

  const { message, notification, dialog, loadingBar } = createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    {
      configProviderProps: configProviderPropsRef,
    },
  )
  window['$message'] = message
  window['$dialog'] = dialog
  window['$notification'] = notification
  window['$loadingBar'] = loadingBar
}
