<template>
  <n-spin :show="loading">
    <div v-if="result?.data">
      <KArea title="订单信息">
        <AutoLayout :cells="orderInfoCells"> </AutoLayout>
      </KArea>
      <KArea title="买家信息">
        <AutoLayout :cells="buyerInfoCells"></AutoLayout>
      </KArea>
      <KArea title="核销信息">
				<AutoLayout :cells="writeOffInfoCells"></AutoLayout>
			</KArea>
      <KArea title="物流轨迹">
        <n-layout class="pl-5">
          <n-collapse arrow-placement="right" display-directive="show">
            <n-collapse-item>
              <template #header="{ collapsed }">
                <n-text>{{ collapsed ? '展开' : '收起' }}</n-text>
              </template>
              <LogisticsTrackView :logistics-info="result?.data.deliveryInfo"></LogisticsTrackView>
            </n-collapse-item>
          </n-collapse>
        </n-layout>
      </KArea>
      <KArea title="商品清单">
        <n-data-table
          striped
          bordered
          :single-line="false"
          :data="result?.data?.productList"
          :columns="productColumns"
          :summary="productSummary"></n-data-table>
      </KArea>
      <FixBottomArea ref="fixBottomAreaRef">
        <OrderOptArea is-detail :order-item="result?.data" :vertical="false"></OrderOptArea>
      </FixBottomArea>
    </div>
  </n-spin>
</template>

<script setup lang="ts">
import { onMounted, h, ref, watchEffect } from 'vue'
import { OrderDetailType, getOrderDetail, OrderStatusMap } from '@/api/order/order.ts'
import { ObjectResponseModel } from '@/api/types.ts'
import { useLoading } from '@/hooks/web/useLoading.ts'
import { NImage } from 'naive-ui'
import { type CellType } from '@/components/AutoLayout/types.ts'
import OrderOptArea from '../component/OrderOptArea.vue'
import LogisticsTrackView from '../component/LogisticsTrackView.vue'

const { loading, result, execute } = useLoading<ObjectResponseModel<OrderDetailType>>(getOrderDetail)
const { id } = defineProps<{
  id: string
}>()
// 订单信息的节点元素
const orderInfoCells = ref<Array<CellType>>([])
// 购买者信息的节点元素
const buyerInfoCells = ref<Array<CellType>>([])
// 核销信息节点元素
const writeOffInfoCells = ref<Array<CellType>>([])
watchEffect(() => {
  orderInfoCells.value = [
    {
      label: '订单编号: ',
      value: result.value?.data.orderNo,
    },
    {
      label: '创建时间: ',
      value: result.value?.data.createTime,
    },
    {
      label: '订单状态: ',
      value: OrderStatusMap[result.value?.data.orderStatus],
    },
    {
      label: '支付时间: ',
      value: result.value?.data.payTime,
    },
    {
      label: '发货时间: ',
      value: result.value?.data.deliveryTime,
    },
    {
      label: '核销时间: ',
      value: result.value?.data.writeOffTime,
    },
    {
      label: '完结时间: ',
      value: result.value?.data.finishTime,
    },
  ]
  buyerInfoCells.value = [
    {
      label: '联系人: ',
      value: result.value?.data.receiveInfo.receiver,
    },
		{
			label: '联系电话: ',
			value: result.value?.data.receiveInfo.phone
		},
    {
      label: '收货地址: ',
      value: `${result.value?.data.receiveInfo.provinceName}${result.value?.data.receiveInfo.cityName}${result.value?.data.receiveInfo.areaName}${result.value?.data.receiveInfo.streetName}${result.value?.data.receiveInfo.address}`,
			span: 6
    },
  ]
	writeOffInfoCells.value = [
		{
			label: ''
		}
	]
})
const productColumns = [
  {
    title: '序号',
    key: 'index',
    render: (_, index: number) => h('span', `${index + 1}`),
  },
  {
    title: '商品图片',
    key: 'masterPicture',
    render: (rowData) =>
      h(NImage, {
        src: rowData.masterPicture,
        width: 40,
        height: 40,
        alt: rowData.name,
        lazy: true,
        previewDisabled: true,
      }),
  },
  {
    title: '商品名称',
    key: 'name',
  },
  {
    title: '商品slug',
    key: 'slug',
    render: (rowData) => h('span', `${rowData.slugTarget}-${rowData.slug}`),
  },
  {
    title: '价格',
    key: 'price',
  },
  {
    title: '小计',
    key: 'price',
  },
]
const productSummary = (pageData) => {
  return {
    index: {
      value: h(
        'div',
        {
          style: {
            'font-weight': 'bold',
            'text-align': 'right',
          },
        },
        '汇总: ' + pageData.reduce((productPrice, row) => productPrice + row.price, 0).toFixed(2),
      ),
      colSpan: 6,
    },
  }
}
const fixBottomAreaRef = ref()
onMounted(() => {
  id && execute && execute(id)
  setTimeout(() => {
    fixBottomAreaRef.value?.getContainerWidth()
  }, 1000)
})
</script>
