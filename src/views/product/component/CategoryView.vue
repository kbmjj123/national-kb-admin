<template>
	<n-form-item label="分类: " path="category" ref="category">
		<n-flex class="w-[100%]">
			<n-cascader
				placeholder="请选择商品分类"
				label-field="name"
				value-field="id"
				children-filed="children"
				expand-trigger="click"
				:options="useCategoryStore.getCategoryList"
				clearable
				check-strategy="parent"
				show-path
				filterable
				class="w-[50%]"
				@update:value="onUpdateCate">
				<template #empty>
					<EmptyGuide description="暂无分类数据，请前往新增" guide="新增分类" @on-guide="toAddCate"></EmptyGuide>
				</template>
				<template #not-found>
					<EmptyGuide description="暂无合适的分类，是否新增" guide="新增分类" @on-guide="toAddCate"></EmptyGuide>
				</template>
			</n-cascader>
			<n-button text type="primary" @click="toAddCate">新增分类<n-icon><ChevronForwardCircleOutline></ChevronForwardCircleOutline></n-icon></n-button>
		</n-flex>
	</n-form-item>
</template>

<script setup lang="ts">
import { onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { CascaderOption } from 'naive-ui'
import { ProductType } from '@/api/product/product.ts'
import { useCategory } from '@/store/modules/category.ts'
import { ChevronForwardCircleOutline } from '@vicons/ionicons5'

const router = useRouter()
const useCategoryStore = useCategory()

const { itemInfo } = defineProps<{
  itemInfo: ProductType
}>()
const category = ref()
const registerItemRef = inject('registerItemRef') as (prop: string, el: HTMLElement) => void
onMounted(async () => {
	if(category.value){
		registerItemRef('category', category.value.$el)
	}
	await useCategoryStore.getCategoryListAction()
})

// 更新分类
const onUpdateCate = (value: string, option: CascaderOption) => {

}

// 前往新增分类或者在当前页面进行新增操作
const toAddCate = () => {
	router.push({
		name: 'category_manage',
		query: {
			showAutoAdd: true
		}
	})
}


</script>
