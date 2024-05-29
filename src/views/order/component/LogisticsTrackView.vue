<template>
  <n-flex v-if="logisticsInfo">
    <n-flex>
      <n-text>承运公司: </n-text>
      <n-text>{{ logisticsInfo.courierName }}</n-text>
    </n-flex>
    <n-timeline :icon-size="20">
      <n-timeline-item
        v-for="(item, index) in logisticsInfo.trackingDetails"
        :key="index"
        :title="item.deliveryStatus"
        :content="item.description"
				:type="index === 0 ? 'success' : 'default'"
        :time="item.time">
      </n-timeline-item>
    </n-timeline>
  </n-flex>
  <EmptyGuide v-else description="暂无配送信息，请耐心等待"></EmptyGuide>
</template>

<script setup lang="ts">

const { logisticsInfo } = defineProps<{
  logisticsInfo?: object
}>()

</script>
