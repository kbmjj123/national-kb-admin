<template>
	<n-card :title="stasticsInfo.title" :segmented="{ content: true, footer: true }" :bordered="false">
		<template #header-extra>
			<n-text>{{ stasticsInfo.statisticalDimensions }}</n-text>
		</template>
		<n-skeleton v-if="loading" :width="100"/>
		<n-statistic v-else :value="stasticsInfo.todayValue" tabular-nums>
			<n-number-animation ref="numberAnimationInstRef" :from="0" :to="stasticsInfo.todayValue" />
		</n-statistic>
		<!-- 同比信息 -->
		<n-flex>
			<n-text></n-text>
			<n-text></n-text>
		</n-flex>
		<!-- 底部汇总 -->
		<template #footer>
			<n-flex>
				<n-text></n-text>
				<n-text></n-text>
			</n-flex>
		</template>
	</n-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { StasticsItemType } from '@/api/system/statistics.ts'
import { NumberAnimationInst } from 'naive-ui'

const { stasticsInfo, loading } = defineProps<{
	stasticsInfo: StasticsItemType,
	loading: boolean
}>()
const numberAnimationInstRef = ref<NumberAnimationInst | null>(null)
</script>
