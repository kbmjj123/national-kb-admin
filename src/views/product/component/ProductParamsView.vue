<template>
  <n-input-group class="gap-3 items-center" v-for="(item, index) in itemInfo.params" :key="index">
    <n-input placeholder="属性名称" class="w-[100px]" v-model:value="item.key"</n-input>
    <n-dynamic-tags :min="1" placeholder="属性值" v-model:value="item.values"></n-dynamic-tags>
    <n-button text type="primary" @click="onAddNewParams">新增</n-button>
    <n-button text type="error" @click="onDeleteParams(index)">删除</n-button>
  </n-input-group>
</template>

<script setup lang="ts">
import { ProductType, ProductParams } from '@/api/product/product.ts'
const { itemInfo } = defineProps<{
	itemInfo: ProductType
}>()
const generateParamsItem = (): ProductParams => {
	return {
		key: '',
		values: [{
			name: '',
		}]
	}
}
const onAddNewParams = () => {
	itemInfo.params.push(generateParamsItem())
}
const onDeleteParams = (index: number) => {
	itemInfo.params.splice(index, 1)
}
</script>
