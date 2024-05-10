<template>
  <Draggable v-model="model" :item-key="itemKey">
    <template #item="{ element }">
      <n-flex class="border-b pl-3" vertical>
				<n-flex justify="space-between" align="center" @click="toggleItem(element)" class="p-4 hover:bg-slate-50 hover:cursor-pointer">
					<n-flex align="center">
						<n-icon v-show="element.children && element.children.length > 0">
							<ChevronForwardCircleOutline></ChevronForwardCircleOutline>
						</n-icon>
						{{ element.name }}
					</n-flex>
					<n-flex>
						<n-button text type="primary" @click="onAddCate">新增</n-button>
						<n-button text type="primary" @click="onEditCate(element)">编辑</n-button>
						<n-button text type="error" @click="onDeleteCate(element)">删除</n-button>
					</n-flex>
				</n-flex>
				<Transition name="fade">
        <NestedDraggableList v-show="element.isExpand" :item-key="itemKey" v-model="element.children"></NestedDraggableList>
				</Transition>
			</n-flex>
    </template>
  </Draggable>

</template>

<script setup lang="ts">
import Draggable from 'vuedraggable'
import { useDialog } from 'naive-ui'
import type { CateType } from '@/api/product/category'
import EditCateModal from './EditCateModal.vue';
import { ChevronForwardCircleOutline } from '@vicons/ionicons5'
const dialog = useDialog()
const { itemKey } = defineProps<{
  itemKey: string
}>()
const model = defineModel({
	required: true,
	type: Array
})
// 切换子元素的显隐状态
const toggleItem = (element) => {
	element.isExpand = !element.isExpand
}

const onAddCate = () => {}

const onEditCate = (row: CateType) => {}

const onDeleteCate = (row: CateType) => {
  dialog.create({
    title: `温馨提示`,
    content: `您确定要删除分类：${row.name}吗？`,
    negativeText: '我再想想',
    positiveText: '确定',
    onPositiveClick: () => {},
  })
}
</script>

<style lang="less">
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.5s ease;
	}
	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>