<template>
	<n-grid responsive="screen">
		<n-grid-item v-for="(item, index) in cells" :key="index" :span="item.span || 1">
			<RenderCell :item="item"></RenderCell>
		</n-grid-item>
	</n-grid>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import RenderCell from './RenderCell'

export type CellType = {
	label?: string,
	value?: string,
	render?: Function,
	itemClass?: string,
	labelClass?: string,
	valueClass?: string,
	span: number
}

const { cells, cols } = withDefaults(defineProps<{
	cells: CellType[],
	cols?: string
}>(), {
	cols: '2 s:3 m:4 l:5 xl:6 2xl:7'
})

</script>
