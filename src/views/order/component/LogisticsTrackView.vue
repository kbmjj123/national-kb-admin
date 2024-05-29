<template>
  <n-spin :show="loading">
    <n-flex v-if="finalLogisticsInfo">
      <n-flex>
				<n-text>承运公司: </n-text>
				<n-text>{{ finalLogisticsInfo.courierName }}</n-text>
			</n-flex>
      <n-timeline :icon-size="20">
        <n-timeline-item
          v-for="(item, index) in finalLogisticsInfo.trackingDetails"
          :key="index"
          :title="item.deliveryStatus"
					:content="item.description"
					:time="item.time">
					
        </n-timeline-item>
      </n-timeline>
    </n-flex>
    <EmptyGuide v-else description="暂无配送信息，请耐心等待"></EmptyGuide>
  </n-spin>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useLoading } from '@/hooks/web/useLoading.ts'
import { browseOrderLogistics, LogisticsType } from '@/api/order/order.ts'
import { ObjectResponseModel } from '@/api/types.ts'

const { id, logisticsInfo } = defineProps<{
  id?: string
  logisticsInfo?: object
}>()

const { loading, execute, result } = useLoading<ObjectResponseModel<LogisticsType>>(browseOrderLogistics)
const finalLogisticsInfo = computed(() => (logisticsInfo || result.data))

watch(id, (newVal) => {
  if (newVal) {
    execute && execute(newVal)
  }
})
</script>
