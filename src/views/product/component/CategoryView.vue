<template>
  <n-form-item label="分类" path="cates" ref="cates">
    <n-flex class="w-[100%]">
      <n-cascader
        placeholder="请选择商品分类"
        label-field="title"
        value-field="id"
        children-filed="children"
        expand-trigger="click"
        :options="useCategoryStore.getCategoryList"
        v-model:value="itemInfo.cates"
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
      <n-button text type="primary" @click="toAddCate"
        >新增分类<n-icon><ChevronForwardCircleOutline></ChevronForwardCircleOutline></n-icon
      ></n-button>
    </n-flex>
  </n-form-item>
</template>

<script setup lang="ts">
import { onMounted, inject, h } from 'vue'
import { useRouter } from 'vue-router'
import { ProductType } from '@/api/product/product.ts'
import { useCategory } from '@/store/modules/category.ts'
import { ChevronForwardCircleOutline } from '@vicons/ionicons5'
import { CateType } from '@/api/product/category'

import { useDialog, NButton, NFlex } from 'naive-ui'
const dialog = useDialog()

const router = useRouter()
const useCategoryStore = useCategory()

const { itemInfo } = defineProps<{
  itemInfo: ProductType
}>()
const cates = ref()
const registerItemRef = inject('registerItemRef') as (prop: string, el: HTMLElement) => void
onMounted(async () => {
  if (cates.value) {
    registerItemRef('cates', cates.value.$el)
  }
  await useCategoryStore.getCategoryListAction()
})

// 更新分类
const onUpdateCate = (value: string, option: CateType) => {
  if (itemInfo.paramsList && itemInfo.paramsList.length > 0) {
		const d = dialog.warning({
			title: '温馨提示',
			content: '您当前已维护了对应分类下的商品属性，切换新的分类将导致原有的属性被替换，请问是否继续切换？',
			action: () => {
				return h(NFlex, {}, [
					h(NButton, { onClick: () => {
						d.destroy()
					} }, '我再想想'),
					h(NButton, { type: 'error', onClick: () => {
						itemInfo.paramsList = option.paramsList || []
						d.destroy()
					} }, '完全替换'),
					h(NButton, { type: 'primary', onClick: () => {
						itemInfo.paramsList = [
							...itemInfo.paramsList,
							...option.paramsList || []
						]
						d.destroy()
					} }, '合并替换')
				])
			}
		})
  } else {
    itemInfo.paramsList = option.paramsList || []
  }
}

// 前往新增分类或者在当前页面进行新增操作
const toAddCate = () => {
  router.push({
    name: 'category_manage',
    query: {
      showAutoAdd: 'true',
    },
  })
}
</script>
