<template>
  <n-form label-placement="left" label-width="auto" :model="orderForm" inline class="flex-wrap">
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
			<n-flex :vertical="false">
				<n-button type="primary" @click="onSearch">查询</n-button>
				<n-button @click="onReset">重置</n-button>
			</n-flex>
    </n-form-item>
  </n-form>
	<n-affix :top="0" listen-to="main-view-fix">
		<n-tabs type="line" animated class="mb-1">
			<n-tab v-for="(item, index) in orderStatusList" :key="index" :name="item.status">{{ item.name }}</n-tab>
		</n-tabs>
	</n-affix>
  <n-data-table
    striped
    bordered
    :single-line="false"
    :loading="loading"
    :data="result?.data?.list"
    :columns="orderColumns"
		:pagination="pagination"></n-data-table>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw, onMounted, h } from 'vue'
import { OrderStatusType, OrderType, getOrderList } from '@/api/order/order.ts'
import { useLoading } from '@/hooks/web/useLoading.ts'
import { type DataTableColumns, type PaginationInfo } from 'naive-ui'
import ProductView from './component/ProductView.vue'
import OrderOptArea from './component/OrderOptArea.vue'

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
		align: 'center',
		key: 'index',
		render: (_, index) => h('span', index + 1)
	},
	{
		title: '订单状态',
		key: 'orderStatus',
		align: 'center',
		render: (rowData) => {
			return h('span', orderStatusList.value.find(item => item.status === rowData.orderStatus)?.name)
		}
	},
	{
		title: '下单时间',
		key: 'createTime',
		align: 'center',
	},
	{
		title: '订单金额',
		key: 'amount',
		align: 'center',
	},
	{
		title: '实收金额',
		key: 'payAmount',
		align: 'center',
	},
	{
		title: '商品信息',
		key: 'productList',
		width: 120,
		render: (rowData) => {
			return h(ProductView, { productList: rowData.productList })
		}
	},
	{
		title: '操作',
		key: 'action',
		fixed: 'right',
		width: 200,
		align: 'center',
		render: (rowData) => {
			return h(OrderOptArea, { orderItem: rowData, isDetail: false, vertical: false })
		}
	}
	
]
const { loading, execute, result } = useLoading(getOrderList)
const pagination = reactive({
	page: 1,
	pageSize: 20,
	pageCount: result.value?.data?.total / 20,
	showSizePicker: true,
	pageSizes: [10, 20, 50, 100],
	itemCount: result.value?.data?.total || 0,
	onUpdatePageSize: (pageSize: number) => {
		pagination.pageSize = pageSize
		pagination.page = 1
		executeAction()
	},
	onUpdatePage: (currentPage: number) => {
		pagination.page = currentPage
		executeAction()
	},
	prefix: (info: PaginationInfo) => {
		return `共 ${info.itemCount} 条`
	}
})

onMounted(() => {
	executeAction()
})
const executeAction = () => {
	execute && execute(orderForm, (res) => {
		pagination.itemCount = res.data.total
		pagination.pageCount = res.data.total / pagination.pageSize
	})
}
const onSearch = () => {
	execute && execute(orderForm)
}
const onReset = () => {
	Object.assign(orderForm, originalFilter)
	execute && execute(orderForm)
}
</script>
