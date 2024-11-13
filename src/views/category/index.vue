<template>
  <div class="m-2">
		<n-button type="primary" @click="onAddFirstCate">新增类目</n-button>
	</div>
	<NestedDraggableList item-key="id" v-model="categoryList" @on-success="getCategoryAction"></NestedDraggableList>
	<EditCateModal v-model="showCateFlag" v-model:cateForm="currentCateInfo"></EditCateModal>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, provide } from 'vue'
import { useRoute } from 'vue-router'

import type { CateType } from '@/api/product/category'
import { getCategoryList } from '@/api/product/category'
import NestedDraggableList from './component/NestedDraggableList.vue'
import EditCateModal from './component/EditCateModal.vue'

const route = useRoute()

// 新增与编辑相关的Modal视图
const showCateFlag = ref(false)
const INIT_CATE_INFO = {
  id: '',
  title: '',
	level: 0,
	parentId: '',
	parentName: '',
	children: []
}
const currentCateInfo = reactive<CateType & {parentName: string}>(INIT_CATE_INFO)

const categoryList: Ref<Array<CateType>> = ref([])

/**
 * 统一的新增或编辑分类的函数
*/
const onAddOrEditAction = (cateInfo: CateType) => {
	Object.assign(currentCateInfo, cateInfo)
	showCateFlag.value = true
}
provide('addOrEditCate', onAddOrEditAction)

onMounted(() => {
  getCategoryAction()
	if(route.query?.showAutoAdd){
		onAddFirstCate()
	}
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
	Object.assign(currentCateInfo, INIT_CATE_INFO)
	showCateFlag.value = true
}

</script>
