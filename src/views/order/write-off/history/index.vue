<template>
  <n-form label-placement="left" label-width="auto" :model="queryForm" inline class="flex-wrap">
		<n-form-item label="订单状态: ">
			<n-select v-model:value="queryForm.orderStatus" style="width: 100px;" :options="orderStatusList"/>
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
import { ref, h, reactive, markRaw, onMounted } from 'vue'
import { useLoading } from '@/hooks/web/useLoading.ts'
import { type OrderType, getWriteOffOrderList, OrderStatusMap } from '@/api/order/order.ts'
import { type DataTableColumns, NDataTable } from 'naive-ui'
import { productColumns } from '../../component/productConstants'

const { loading, execute, result } = useLoading(getWriteOffOrderList)

const tempOrderStatusList = Object.entries(OrderStatusMap).map(([key, value]) => {
	return { value: key, label: value }
})
tempOrderStatusList.push({
	value: '-1',
	label: '全部'
})
const orderStatusList = ref(tempOrderStatusList)

const queryForm = reactive({
	orderStatus: '-1',
	orderNo: '',
  buyer: '',
  startTime: '',
  endTime: '',
  time: [1183135260000, Date.now()],
})
const originalForm = markRaw(queryForm)
const orderColumns: DataTableColumns<OrderType> = [
	{
		title: '序号',
		key: 'index',
		align: 'center',
		render: (_, index: number) => h('span', index + 1)
	},
	{
		title: '订单号',
		key: 'orderNo'
	},
	{
		type: 'expand',
		expandable: (rowData: OrderType) => rowData.productList?.length > 0,
		renderExpand: (rowData: OrderType) => {
			return h(NDataTable, {
				data: rowData.productList,
				bordered: true,
				singleLine: false,
				columns: productColumns
			})
		}
	},
	{
		title: '提货人',
		key: 'buyerInfo',
		render: (rowData) => h('span', rowData.buyerInfo.name)
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
onMounted(() => {
	execute && execute(queryForm)
})
</script>
