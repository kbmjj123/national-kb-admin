<template>
  <n-form label-placement="left" label-width="auto" :model="orderForm" inline>
    <n-form-item label="单号: ">
      <n-input placeholder="请输入订单号" v-model:value="orderForm.orderNo"></n-input>
    </n-form-item>
    <n-form-item label="下单人: ">
      <n-input placeholder="请输入下单人账号" v-model:value="orderForm.buyer"></n-input>
    </n-form-item>
    <n-form-item label="下单时间: ">
      <n-date-picker v-model:value="orderForm.time" type="datetimerange" clearable></n-date-picker>
    </n-form-item>
    <n-form-item>
      <n-button type="primary" @click="onSearch">查询</n-button>
      <n-button @click="onReset">重置</n-button>
    </n-form-item>
  </n-form>
  <n-tabs type="line" animated>
    <n-tab v-for="(item, index) in orderStatusList" :key="index" :name="item.status">{{ item.name }}</n-tab>
  </n-tabs>
  <n-data-table
    striped
    bordered
    :single-line="false"
    :loading="loading"
    :data="result.data.list"
    :columns="orderColumns"></n-data-table>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw, onMounted, h } from 'vue'
import { OrderStatusType, OrderType, getOrderList } from '@/api/order/order.ts'
import { useLoading } from '@/hooks/web/useLoading.ts'
import { type DataTableColumns } from 'naive-ui'
import ProductView from './component/ProductView'
import OrderOptArea from './component/OrderOptArea'

const orderStatusList = ref([
  {
    status: 0,
    name: '全部',
  },
  {
    status: OrderStatusType.WAIT_TO_PAY,
    name: '待付款',
  },
  {
    status: OrderStatusType.WAIT_TO_DELIVERY,
    name: '待发货',
  },
  {
    status: OrderStatusType.WAIT_TO_RECEIVE,
    name: '待收货',
  },
  {
    status: OrderStatusType.FINISH,
    name: '已完成',
  },
  {
    status: OrderStatusType.CANCELED,
    name: '已取消',
  },
])
const orderForm = reactive({
  orderNo: '',
  buyer: '',
  startTime: '',
  endTime: '',
  time: [1183135260000, Date.now()],
})
const originalFilter = toRaw(orderForm)
const orderColumns: DataTableColumns<OrderType> = [
	{
		title: '序号',
		width: 60,
		key: 'index'
	},
	{
		title: '订单状态',
		key: 'orderStatus'
	},
	{
		title: '下单时间',
		key: 'createTime'
	},
	{
		title: '订单金额',
		key: 'amount'
	},
	{
		title: '实收金额',
		key: 'receiveAmount'
	},
	{
		title: '商品信息',
		key: 'productList',
		render: (rowData) => {
			return h(ProductView, { productList: rowData.productList })
		}
	},
	{
		title: '操作',
		key: 'action',
		render: (rowData) => {
			return h(OrderOptArea, { orderItem: rowData, isDetail: false, vertical: false })
		}
	}
	
]
const { loading, execute, result } = useLoading(getOrderList)

onMounted(() => {
	execute && execute(orderForm)
})

const onSearch = () => {
	execute && execute(orderForm)
}
const onReset = () => {
	Object.assign(orderForm, originalFilter)
	execute && execute(orderForm)
}
</script>
