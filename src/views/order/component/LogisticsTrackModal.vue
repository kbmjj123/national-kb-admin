<template>
  <n-modal v-model:show="model" title="物流轨迹" preset="dialog" content-class="h-[60vh]">
    <n-spin :show="loading">
			<n-scrollbar class="h-[60vh]">
      <LogisticsTrackView :id="id" :logistics-info="result?.data"></LogisticsTrackView>
		</n-scrollbar>
    </n-spin>
  </n-modal>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import LogisticsTrackView from './LogisticsTrackView.vue'
import { useLoading } from '@/hooks/web/useLoading.ts'
import { browseOrderLogistics, LogisticsType } from '@/api/order/order.ts'
import { ObjectResponseModel } from '@/api/types.ts'

const model = defineModel({
  required: true,
  type: Boolean,
})
const { id } = defineProps<{
  id: string
}>()
const { loading, execute, result } = useLoading<ObjectResponseModel<LogisticsType>>(browseOrderLogistics)

watch(model, (newVal) => {
  if (newVal) {
    execute && execute(id)
  }
})
</script>
