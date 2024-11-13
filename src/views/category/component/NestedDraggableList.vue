<template>
  <Draggable v-model="model" :item-key="itemKey">
    <template #item="{ element, index }">
      <n-flex class="border-b pl-4" vertical>
        <n-flex
          justify="space-between"
          align="center"
          @click="toggleItem(element)"
          class="p-4 hover:bg-slate-50 hover:cursor-pointer">
          <n-flex align="center">
            <n-icon
              v-show="element.children && element.children.length > 0"
              :class="['arrow-icon', element.isExpand ? 'arrow-icon-rotate' : '']">
              <ChevronForwardCircleOutline></ChevronForwardCircleOutline>
            </n-icon>
            {{ element.title }}
          </n-flex>
          <n-flex>
            <n-button text type="primary" v-if="element.level < 3" @click.stop="onAddChildCate(element)">新增</n-button>
            <n-button text type="primary" @click.stop="onEditCate(element, index)">编辑</n-button>
            <n-button text type="error" @click.stop="onDeleteCate(element)">删除</n-button>
          </n-flex>
        </n-flex>
        <Transition title="fade" v-if="element.children && element.children.length > 0">
          <section v-show="element.isExpand">
            <NestedDraggableList
              :item-key="itemKey"
              @on-success="emit('on-success')"
              v-model="element.children"></NestedDraggableList>
          </section>
        </Transition>
      </n-flex>
    </template>
  </Draggable>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import Draggable from 'vuedraggable'
import { useDialog, useMessage } from 'naive-ui'
import { CateType, deleteCate } from '@/api/product/category'
import { ChevronForwardCircleOutline } from '@vicons/ionicons5'
const dialog = useDialog()
const message = useMessage()
const { itemKey } = defineProps<{
  itemKey: string
}>()
const model = defineModel({
  required: true,
  type: Array,
})
const emit = defineEmits<{
  'on-success': []
}>()
const addOrEditCate = inject<Function>('addOrEditCate')
// 切换子元素的显隐状态
const toggleItem = (element: CateType) => {
  element.isExpand = !element.isExpand
}
/**
 * 添加子分类
 */
const onAddChildCate = (element: CateType) => {
  const childElm = {
    parentId: element.id,
    parentName: element.title,
    level: element.level + 1,
  }
  addOrEditCate && addOrEditCate(childElm)
}

const onEditCate = (row: CateType, index: number) => {
	console.info(model.value, index)
  row.parentName = ''
  addOrEditCate && addOrEditCate(row)
}

const onDeleteCate = (row: CateType) => {
  if (row.children && row.children.length > 0) {
    dialog.warning({
      title: `温馨提示`,
      content: `您好，该分类下拥有子分类，请确保没有子分类，方可进行删除操作`,
      positiveText: '好的',
    })
    return
  }
  dialog.warning({
    title: `温馨提示`,
    content: `您确定要删除分类：${row.title}吗？`,
    negativeText: '我再想想',
    positiveText: '确定',
    onPositiveClick: async () => {
      const res = await deleteCate(row.id as string)
      message.success(res.message)
      emit('on-success')
    },
  })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.arrow-icon {
  transition: all 0.1s ease-in-out;
}
.arrow-icon-rotate {
  transform: rotate(90deg) !important;
}
</style>
