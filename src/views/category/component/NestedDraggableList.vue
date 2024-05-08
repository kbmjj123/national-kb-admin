<template>
  <Draggable v-model="model" :item-key="itemKey">
    <template #item="{ element }">
      <div class="p-4 bg-white border-b">
        {{ element.name }}
        <n-space>
          <n-button text type="primary" @click="onAddCate">新增</n-button>
          <n-button text type="primary" @click="onEditCate(element)">编辑</n-button>
          <n-button text type="error" @click="onDeleteCate(element)">删除</n-button>
        </n-space>
        <NestedDraggableList :item-key="itemKey" v-model="element.children"></NestedDraggableList>
      </div>
    </template>
  </Draggable>
</template>

<script setup lang="ts">
import Draggable from 'vuedraggable'
import { useDialog } from 'naive-ui'
import type { CateType } from '@/api/product/category'
const dialog = useDialog()
const { itemKey } = defineProps<{
  itemKey: string
}>()
const model = defineModel({
	required: true,
	type: Array
})
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
