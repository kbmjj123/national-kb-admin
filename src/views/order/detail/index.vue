<template>
	<n-spin :show="loading">
		<KArea title="订单信息">
			<AutoLayout>
			</AutoLayout>
		</KArea>
		<KArea title="买家信息"></KArea>
		<KArea title="核销信息"></KArea>
		<KArea title="物流轨迹">
			<LogisticsTrackView :logistics-info="result.data.logisticsInfo"></LogisticsTrackView>
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
		<FixBottomArea>
			<OrderOptArea is-detail :order-item="result.data"></OrderOptArea>
		</FixBottomArea>
	</n-spin>
</template>

<script setup lang="ts">
import { onMounted, h } from 'vue'
import { OrderDetailType, getOrderDetail } from '@/api/order/order.ts'
import { ObjectResponseModel } from '@/api/types.ts'
import { useLoading } from '@/hooks/web/useLoading.ts'
import { NImage } from 'naive-ui'
import OrderOptArea from '../component/OrderOptArea.vue'
import LogisticsTrackView from '../component/LogisticsTrackView.vue'

const { loading, result, execute } = useLoading<ObjectResponseModel<OrderDetailType>>(getOrderDetail)
const { id } = defineProps<{
	id: string
}>()
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
      value: h('div', {
				style: {
					'font-weight': 'bold',
					'text-align': 'right'
				}
			},'汇总: ' + pageData.reduce((productPrice, row) => productPrice + row.price, 0).toFixed(2)),
      colSpan: 5
    }
	}
}

onMounted(() => {
  id && execute && execute(id)
})
</script>
