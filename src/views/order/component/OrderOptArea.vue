<template>
  <n-flex :vertical="vertical">
    <n-button
      v-for="(item, index) in buttonList"
      :key="index"
      @click="item.clickAction && item.clickAction()"
      :type="item.type"
      :ghost="item.ghost"
      >{{ item.name }}</n-button
    >
  </n-flex>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { OrderType, OrderStatusType } from '@/api/order/order.ts'

const router = useRouter()
const { vertical, orderItem, isDetail } = withDefaults(
  defineProps<{
    vertical: boolean
    orderItem: OrderType
    isDetail: boolean
  }>(),
  {
    vertical: false,
    orderItem: null,
    isDetail: false,
  },
)

const BUTTON_OPT_MAG = [
  {
    name: '详情',
    type: 'primary',
    ghost: true,
    sort: 10,
    clickAction: () => {
      router.push({
        name: 'order_detail',
        params: {
          id: orderItem.id,
        },
      })
    },
    optList: [999],
  },
  {
    name: '发货',
    type: 'primary',
    ghost: false,
    sort: 9,
    clickAction: () => {
			// 发货动作
		},
    optList: [OrderStatusType.WAIT_TO_DELIVERY],
  },
  {
    name: '核销',
    type: 'primary',
    ghost: false,
    sort: 8,
    clickAction: () => {
			// 核销动作
		},
    optList: [OrderStatusType.WAIT_TO_DELIVERY],
  },
  {
    name: '取消订单',
    type: 'primary',
    ghost: false,
    sort: 7,
		clickAction: () => {
			// 取消订单
		},
    optList: [OrderStatusType.WAIT_TO_PAY],
  },
  {
    name: '物流轨迹',
    type: 'primary',
    ghost: false,
    sort: 6,
    clickActoin: () => {
			// 查看物流轨迹
		},
    optList: [OrderStatusType.WAIT_TO_RECEIVE, OrderStatusType.FINISH],
  },
  {
    name: '打印',
    type: 'primary',
    ghost: false,
    sort: 6,
    clickAction: () => {
			// 打印
		},
    optList: [OrderStatusType.WAIT_TO_DELIVERY, OrderStatusType.WAIT_TO_RECEIVE, OrderStatusType.FINISH],
  },
]

const buttonList = computed(() => {
  return BUTTON_OPT_MAG.filter((item) => {
    return item.optList.includes(orderItem.orderStatus) || (isDetail && item.optList[0] === 999)
  }).map((item) => ({
    ...item,
    ghost: !isDetail,
  }))
})
</script>
