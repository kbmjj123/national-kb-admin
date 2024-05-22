<template>
  <n-form label-placement="left" label-width="auto" :model="orderForm">
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
    :data="orderList"
    :columns="orderColumns"></n-data-table>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw } from 'vue'
import { OrderStatusType, OrderType, getOrderList } from '@/api/order/order.ts'
import { type DataTableColumns } from 'naive-ui'

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
  time: [],
})
const originalFilter = toRaw(orderForm)
const loading = ref(false)
const orderList = ref<OrderType[]>([])
const orderColumns: DataTableColumns<OrderType> = [
	{
		title: '序号',
		width: 60,
		key: 'index'
	},
	{
		key: ''
	}
]

const onSearch = () => {}
const onReset = () => {
	
}
</script>
