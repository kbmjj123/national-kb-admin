<template>
	<n-grid responsive="screen" :cols="cols" class="p-5" :x-gap="12" :y-gap="12">
		<n-grid-item v-for="(item, index) in cells" :key="index" :span="item.span || 1">
			<RenderCell :item="item"></RenderCell>
		</n-grid-item>
	</n-grid>
</template>

<script setup lang="ts">
import RenderCell from './RenderCell'
import { CellType } from './types.ts'

const { cells, cols } = withDefaults(defineProps<{
	cells: CellType[],
	cols?: string
}>(), {
	cols: '2 s:2 m:3 l:3 xl:4 2xl:4'
})

</script>
