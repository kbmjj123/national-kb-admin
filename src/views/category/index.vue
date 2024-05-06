<template>
  <div>
		<n-button type="primary" @click="onAddFirstCate">新增类目</n-button>
	</div>
  <Draggable v-model="categoryList">
    <CateItem v-for="(item, index) in categoryList" :item-info="item" :key="index" />
  </Draggable>
  <!-- 新增/编辑分类的视图 -->
  <EditCateModal v-model="showCateFlag" :item-info="currentCateInfo"></EditCateModal>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue'
import Draggable from 'vuedraggable'
import type { CateType } from '@/api/product/category'
import { getCategoryList } from '@/api/product/category'
import EditCateModal from './component/EditCateModal.vue'
import CateItem from './component/CateItem.vue'
const categoryList: Ref<Array<CateType>> = ref([])

const showCateFlag = ref(false)
const currentCateInfo = reactive<CateType>({
  id: '',
  name: '',
})

onMounted(() => {
  getCategoryAction()
})

// 获取分类列表
const getCategoryAction = async () => {
  const res = await getCategoryList()
  categoryList.value = res.data
}

// 新增分类
const onAddFirstCate = () => {
	
}
</script>
