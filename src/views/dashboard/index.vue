<template>
  <n-grid item-responsive cols="1 s:2 m:3 l:4 xl:4 2xl:4" :x-gap="12" :y-gap="8" responsive="screen">
		<n-grid-item v-for="(item, index) in finalStasticsInfo" :key="index">
			<TotalStasticsItem :stasticsInfo="item" :loading="loading"></TotalStasticsItem>
		</n-grid-item>
	</n-grid>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { StasticsItemType, TotalStatisticsType, getTotalStastisticsInfo } from '@/api/system/statistics.ts'
import { useLoading } from '@/hooks/web/useLoading.ts'
import TotalStasticsItem from './component/TotalStasticsItem.vue'

const { loading, result, execute } = useLoading(getTotalStastisticsInfo)

const finalStasticsInfo = computed(() => {
	result.value.data.
})

onMounted(() => {
	execute && execute()
})
</script>
