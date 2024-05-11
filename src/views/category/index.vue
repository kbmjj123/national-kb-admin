<template>
  <div>
		<n-button type="primary" @click="onAddFirstCate">新增类目</n-button>
	</div>
	<NestedDraggableList item-key="id" v-model="categoryList" @on-success="xxx"></NestedDraggableList>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue'

import type { CateType } from '@/api/product/category'
import { getCategoryList } from '@/api/product/category'
import NestedDraggableList from './component/NestedDraggableList.vue'

const categoryList: Ref<Array<CateType>> = ref([])

onMounted(() => {
  getCategoryAction()
})

const xxx = () => {
	console.info(123)
}

// 获取分类列表
const getCategoryAction = async () => {
  const res = await getCategoryList()
  categoryList.value = res.data.map(item => ({
		...item,
		isExpand: false
	}))
}

// 新增分类
const onAddFirstCate = () => {
	
}

</script>
