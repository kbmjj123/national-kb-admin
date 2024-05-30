<template>
  <n-form label-placement="left" label-width="auto" :model="queryForm" inline class="flex-wrap">
		<n-form-item label="订单状态: ">
			<n-select :options="orderStatusList">
				
			</n-select>
		</n-form-item>
    <n-form-item label="订单号: ">
      <n-input placeholder="请输入订单号" v-model:value="queryForm.orderNo"></n-input>
    </n-form-item>
    <n-form-item label="提货人: ">
      <n-input placeholder="请输入提货人账号" v-model:value="queryForm.buyer"></n-input>
    </n-form-item>
    <n-form-item label="提货时间: ">
      <n-date-picker v-model:value="queryForm.time" type="datetimerange" clearable></n-date-picker>
    </n-form-item>
    <n-form-item>
			<n-flex :vertical="false">
				<n-button type="primary" @click="onSearch">查询</n-button>
				<n-button @click="onReset">重置</n-button>
			</n-flex>
    </n-form-item>
  </n-form>
  <n-data-table
    bordered
    :single-column="false"
    :loading="loading"
    :data="result?.data.list"
    default-expand-all
    :columns="orderColumns"></n-data-table>
</template>

<script setup lang="ts">
import { ref, h, reactive, markRaw } from 'vue'
import { useLoading } from '@/hooks/web/useLoading.ts'
import { getWriteOffOrderList, OrderStatusMap } from '@/api/order/order.ts'

const { loading, execute, result } = useLoading(getWriteOffOrderList)

const orderStatusList = ref(Object.entries(OrderStatusMap).map(([key, value])) => {
	return { key, value }
})

const queryForm = reactive({
	orderNo: '',
  buyer: '',
  startTime: '',
  endTime: '',
  time: [1183135260000, Date.now()],
})
const originalForm = markRaw(queryForm)
const orderColumns = [
	{
		title: '序号',
		key: 'index',
		render: (_, index: number) => h('span', `${index} + 1`)
	},
	{
		title: '订单号',
		key: 'orderNo'
	},
	{
		title: '提货人',
		key: ''
	},
	{
		title: '提货时间',
		key: ''
	}
]
const onSearch = () => {
	execute && execute(queryForm)
}
const onReset = () => {
	Object.assign(queryForm, originalForm)
}
</script>
