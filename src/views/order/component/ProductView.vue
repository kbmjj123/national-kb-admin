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

import { MoreOutlined } from '@vicons/antd'
import { type OrderProductType } from '@/api/order/order.ts'
import { productColumns } from './productConstants'

const { productList } = defineProps<{
  productList: Array<OrderProductType>
}>()
const firstItem: OrderProductType = productList[0]

</script>
