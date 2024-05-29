import { defineComponent, h } from 'vue'
import { NFlex, NText } from 'naive-ui'
import { CellType } from './types.ts'

export default defineComponent({
	name: 'RenderCell',
	props: {
		item: {}
	},
	setup({ item }: { item: CellType }) {
		return () => item?.render ? item?.render(item) : h(NFlex, {
			class: item?.itemClass
		}, () => [
			h(NText, { class: item?.labelClass }, () => item?.labelRender ? item?.labelRender() : item?.label),
			h(NText, { class: item?.valueClass }, () => item?.value)
		])
	}
})