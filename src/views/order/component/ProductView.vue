<template>
  <n-flex :vertical="false" :wrap="false" align="flex-end" class="gap-1">
    <n-image :src="firstItem.masterPicture" lazy preview-disabled width="60px" height="60px"></n-image>
    <n-popover v-if="productList && productList.length > 1" trigger="click">
      <template #trigger>
        <n-icon class="cursor-pointer">
          <MoreOutlined></MoreOutlined>
        </n-icon>
      </template>
      <!-- 商品数据 -->
      <n-data-table :data="productList" bordered :single-line="false" :columns="productColumns"></n-data-table>
    </n-popover>
  </n-flex>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { MoreOutlined } from '@vicons/antd'
import { type DataTableColumns, NImage } from 'naive-ui'
import { type OrderProductType } from '@/api/order/order.ts'

const { productList } = defineProps<{
  productList: Array<OrderProductType>
}>()
const firstItem: OrderProductType = productList[0]
const productColumns: DataTableColumns = [
  {
    title: '商品编码',
    key: 'slug',
		align: 'center'
  },
  {
    title: '商品名称',
    key: 'name',
  },
	{
		title: '商品图片',
		key: 'masterPic',
		render: (rowData, index) => {
			return h(NImage, { src: rowData.masterPicture, width: '60px', height: '60px' })
		}
	},
	{
		title: '购买数量',
		key: 'quantity',
		align: 'center'
	},
  {
    title: '小计',
    key: 'subTotal',
  },
]
</script>
