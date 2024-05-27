<template>
  <KArea title="订单信息"> </KArea>
  <KArea title="商品清单">
    <n-data-table
      striped
      bordered
      :single-line="false"
      :loading="loading"
      :data="result?.data?.productList"
      :columns="productColumns"
      :summary="productSummary"></n-data-table>
  </KArea>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import { useRoute } from 'vue-router'
import { OrderStatusType, OrderDetailType, getOrderDetail } from '@/api/order/order.ts'
import { ObjectResponseModel } from '@/api/types.ts'
import { useLoading } from '@/hooks/web/useLoading.ts'
import { NImage, RowData } from 'naive-ui'

const route = useRoute()
const { loading, result, execute } = useLoading<ObjectResponseModel<OrderDetailType>>(getOrderDetail)

const productColumns = [
  {
    title: '序号',
    key: 'index',
    render: (_, index) => h('span', `${index + 1}`),
  },
  {
    title: '商品图片',
    key: 'masterPicture',
    render: (rowData: RowData) =>
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
    render: (rowData: RowData) => h('span', `${rowData.slugTarget}-${rowData.slug}`),
  },
  {
    title: '价格',
    key: 'price',
  },
]
const productSummary = (pageData: RowData[]) => {
  return {
		index: {
      value: h('span', '汇总: ' + pageData.reduce((productPrice, row) => productPrice + row.price, 0)),
      colSpan: 5
    }
	}
}

onMounted(() => {
  route.params.id && execute && execute(route.params.id)
})
</script>
