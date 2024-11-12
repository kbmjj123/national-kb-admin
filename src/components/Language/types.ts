type LanguageUI = 'input' | 'textarea' | 'richText' | 'icon'
type LanguageType = 'zh-CN' | 'zh-TW' | 'es'

export type LanguageUIType = {
	type: LanguageUI,
	value: string,
	label: string,
	originalValue: string
}

export type LanguageItemType = {
	key: string,
	languageMapList: Array<LanguageUIType>
}
