<template>
  <n-modal
    v-model:show="model"
    preset="dialog"
    :title="itemInfo && itemInfo.id ? '编辑分类' : '新增分类'"
    negative-text="取消"
    positive-text="确定"
    @positive-click="onAddOrEditAction">
    <n-form
      inline
      label-placement="left"
      label-width="auto"
      ref="editCateForm"
      :model="cateForm"
      :rules="cateFormRules">
      <n-form-item label="上级分类:" v-if="parentCate">
				<n-input readonly></n-input>
			</n-form-item>
			<n-form-item label="分类名称:" path="name">
				<n-input clearable autofocus placeholder="请输入分类名称" v-model:value="cateForm.name"></n-input>
			</n-form-item>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { CateType, addCate, editCate } from '@/api/product/category'

const { itemInfo, parentCate } = defineProps<{
  itemInfo?: CateType,
	parentCate?: string
}>()

const emit = defineEmits<{
  'on-success': [cate: CateType]
}>()

const model = defineModel({
  type: Boolean,
})
const cateFormRules = {
  name: {
    required: true,
    message: '请输入分类名称',
    trigger: 'blur',
  },
}

watch(model, (newVal) => {
  if (newVal) {
		if(itemInfo){
			cateForm.id = itemInfo.id
			cateForm.name = itemInfo.name
		}
  }
})

const editCateForm = ref()
const cateForm = reactive<CateType>({
  id: '',
  name: '',
	level: 0,
	parentId: ''
})

// 新增或者编辑操作
const onAddOrEditAction = () => {
  return new Promise((resolve) => {
    editCateForm.value?.validate(async (errors) => {
      if (!errors) {
        let res: any
        if (cateForm.id) {
          res = await editCate(cateForm)
        } else {
          res = await addCate(cateForm)
        }
        emit('on-success', res?.data)
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}
</script>
