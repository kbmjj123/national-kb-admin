<template>
	<div class="p-12 bg-white border-b">
		{{ itemInfo.name }}
		<n-space>
			<n-button text type="primary" @click="onAddCate">新增</n-button>
			<n-button text type="primary" @click="onEditCate">编辑</n-button>
			<n-button text type="error" @click="onDeleteCate">删除</n-button>
		</n-space>
	</div>
</template>

<script setup lang="ts">
import { CateType } from '@/api/product/category'
import { useDialog } from 'naive-ui'
const dialog = useDialog()

const { itemInfo } = defineProps<{
	itemInfo: CateType
}>()

const emit = defineEmits<{
	'on-add-cate': [],
	'on-edit-cate': [cateInfo: CateType],
	'on-delete-cate': [cateInfo: CateType]
}>()

const onAddCate = () => {
	emit('on-add-cate')
}

const onEditCate =() => {
	emit('on-edit-cate', itemInfo)
}

const onDeleteCate = () => {
	dialog.create({
		title: `温馨提示`,
		content: `您确定要删除分类：${itemInfo.name}吗？`,
		negativeText: '我再想想',
		positiveText: '确定',
		onPositiveClick: () => {
			emit('on-delete-cate', itemInfo)
		}
	})
}

</script>