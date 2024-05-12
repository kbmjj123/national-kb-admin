<template>
  <div>
		<n-button type="primary" @click="onAddFirstCate">新增类目</n-button>
	</div>
	<NestedDraggableList item-key="id" v-model="categoryList" @on-success="getCategoryAction"></NestedDraggableList>
	<EditCateModal v-model="showCateFlag"></EditCateModal>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue'

import type { CateType } from '@/api/product/category'
import { getCategoryList } from '@/api/product/category'
import NestedDraggableList from './component/NestedDraggableList.vue'
import EditCateModal from './component/EditCateModal.vue'

// 新增与编辑相关的Modal视图
const showCateFlag = ref(false)

const categoryList: Ref<Array<CateType>> = ref([])

onMounted(() => {
  getCategoryAction()
})


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
	showCateFlag.value = true
}

</script>
