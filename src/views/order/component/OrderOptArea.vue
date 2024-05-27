<template>
  <n-flex :vertical="vertical" justify="center">
    <n-button
      v-for="(item, index) in buttonList"
      :key="index"
      @click="item.clickAction && item.clickAction()"
      :type="item.type"
      :ghost="item.ghost"
      :text="item.text"
      >{{ item.name }}</n-button
    >
  </n-flex>
	<!-- 录入快递单号信息的对话框 -->
  <InputLogisticsNoModal
    v-model="showInputLogisticsInfoFlag"
    :id="orderItem.id"
    @on-success="emits('on-success')"></InputLogisticsNoModal>
	<!-- 查看快递物流轨迹的对话框 -->
	<LogisticsTrackModal v-model="showLogisticsTrackFlag" :id="orderItem.id"></LogisticsTrackModal>
	<!-- 浏览核销历史 -->
	<WriteOffHistoryModal v-model="showWriteOffFlag" :id="orderItem.id"></WriteOffHistoryModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDialog } from 'naive-ui'
import { OrderType, OrderStatusType, cancelOrder } from '@/api/order/order.ts'
import InputLogisticsNoModal from './InputLogisticsNoModal.vue'
import LogisticsTrackModal from './LogisticsTrackModal.vue'

const router = useRouter()
const dialog = useDialog()
const { vertical, orderItem, isDetail } = withDefaults(
  defineProps<{
    vertical: boolean
    orderItem: OrderType
    isDetail: boolean
  }>(),
  {
    vertical: false,
    isDetail: false,
  },
)
const emits = defineEmits<{
  'on-success': []
}>()

// 发货相关变量
const showInputLogisticsInfoFlag = ref(false)
// 查看快读物流轨迹的对话框
const showLogisticsTrackFlag = ref(false)
// 查看核销历史
const showWriteOffFlag = ref(false)

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
      showInputLogisticsInfoFlag.value = true
    },
    optList: [OrderStatusType.WAIT_TO_DELIVERY],
  },
  {
    name: '核销',
    type: 'primary',
    ghost: false,
    sort: 8,
    clickAction: () => {
      // 核销动作，进入统一核销页面
			router.push({
				name: 'order_write_off',
				params: {
					id: orderItem.id
				}
			})
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
      dialog.warning({
        title: '温馨提示',
        content: `您确定要取消订单(单号: ${orderItem.orderNo})吗?`,
        negativeText: '我再想想',
        positiveText: '确定取消',
        onPositiveClick: async () => {
          await cancelOrder({
            id: orderItem.id
          })
					emits('on-success')
        },
      })
    },
    optList: [OrderStatusType.WAIT_TO_PAY],
  },
  {
    name: '物流轨迹',
    type: 'primary',
    ghost: false,
    sort: 6,
    clickActoin: () => {
      // 查看物流轨迹 --> 通过第三方内嵌的网页去进行查询
			showLogisticsTrackFlag.value = true
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
			router.push({
				name: 'order_print',
				params: {
					id: orderItem.id
				}
			})
    },
    optList: [OrderStatusType.WAIT_TO_DELIVERY, OrderStatusType.WAIT_TO_RECEIVE, OrderStatusType.FINISH],
  },
	{
		name: '核销历史',
		type: 'primary',
		ghost: false,
		sort: 5,
		dynamicExist: () => {
			return orderItem.orderStatus && orderItem.writeOffId
		},
		clickAction: () => {
			// 核销历史
			showWriteOffFlag.value = true
		},
		optList: [OrderStatusType.FINISH]
	}
]

const buttonList = computed(() => {
  return BUTTON_OPT_MAG.filter((item) => {
    return item.optList?.includes(orderItem.orderStatus) || (!isDetail && item.optList[0] === 999)
  }).map((item) => ({
    ...item,
    ghost: !isDetail,
    text: !isDetail,
  }))
})
</script>
