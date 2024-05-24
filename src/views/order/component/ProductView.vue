<template>
  <n-flex>
    <n-image :src="firstItem.masterPic" lazy preview-disabled width="80px" height="80px"></n-image>
    <n-popover v-if="productList && product.length > 1">
      <template #trigger>
        <n-icon>
          <MoreOutlined></MoreOutlined>
        </n-icon>
      </template>
      <!-- 商品数据 -->
      <n-data-table :data="productList" bordered single-line :columns="productColumns"></n-data-table>
    </n-popover>
  </n-flex>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { MoreOutlined } from '@vicons/antd'
import { type DataTableColumns, NImage } from 'naive-ui'
import { type OrderProductType } from '@/api/order/order.ts'

const { productList } = defineProps<{
  productList: Array<OrderProductType>
}>()
const firstItem = productList[0]
const productColumns: DataTableColumns = [
  {
    title: '商品编码',
    key: 'slug',
  },
  {
    title: '商品名称',
    key: 'name',
  },
	{
		title: '商品图片',
		key: 'masterPic',
		render: h(rowData) => {
			return h(NImage, { src: rowData.masterPic, width: '80px', height: '80px' })
		}
	},
  {
    title: '商品价格',
    key: 'price',
  },
  {
    title: '购买数量',
    key: 'quantity',
  },
  {
    title: '小计',
    key: 'subTotal',
  },
]
</script>
