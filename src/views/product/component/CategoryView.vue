<template>
  <n-cascader
    v-model:value="itemInfo.category"
    placeholder="请选择商品分类"
		label-field="name"
		value-field="id"
		children-filed="children"
    expand-trigger="click"
		:options="useCategoryStore.getCategoryList"
    check-strategy
    show-path
    filterable
    @update:value="onUpdateCate">
		<template #empty>
			<EmptyGuide description="暂无分类数据，请前往新增" guide="新增分类" @on-guide="toAddCate"></EmptyGuide>
		</template>
		<template #not-found>
			<EmptyGuide description="暂无合适的分类，是否新增" guide="新增分类" @on-guide="toAddCate"></EmptyGuide>
		</template>
	</n-cascader>
	<n-button text type="primary" @click="toAddCate">新增分类<n-icon><ArrowRightOutlined></ArrowRightOutlined></n-icon></n-button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CascaderOption } from 'naive-ui'
import { ProductType } from '@/api/product/product.ts'
import { useCategory } from '@/store/modules/category.ts'
import { ArrowRightOutlined } from '@vicons/antd'
const useCategoryStore = useCategory()

const { itemInfo } = defineProps<{
  itemInfo: ProductType
}>()

onMounted(async () => {
	await useCategoryStore.getCategoryListAction()
})

// 更新分类
const onUpdateCate = (value: string, option: CascaderOption) => {}

// 前往新增分类或者在当前页面进行新增操作
const toAddCate = () => {}


</script>
