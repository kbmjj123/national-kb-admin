<template>
  <n-modal
    v-model:show="model"
    preset="dialog"
    :title="cateForm && cateForm.id ? '编辑分类' : '新增分类'"
		:loading="submiting"
    negative-text="取消"
    positive-text="确定"
    @positive-click="onAddOrEditAction">
    <n-form label-placement="left" label-width="auto" ref="editCateForm" :model="cateForm" :rules="cateFormRules">
      <n-form-item label="上级分类:" v-if="cateForm.parentId">
        <n-input readonly v-model:value="cateForm.parentName"></n-input>
      </n-form-item>
      <n-form-item label="分类名称:" path="title">
        <n-input clearable autofocus placeholder="请输入分类名称" v-model:value="cateForm.title"></n-input>
      </n-form-item>
      <n-form-item label="对应属性: ">
        <n-flex vertical>
          <n-input-group v-for="(item, index) in cateForm.paramsList" :key="index">
            <n-input class="w-[40%]" placeholder="属性名" v-model:value="item.key"></n-input>
            <n-input placeholder="属性值，多个以逗号分割" v-model:value="item.values"></n-input>
            <n-button @click="onAddNewTag" ghost type="primary" v-if="index === cateForm.paramsList!.length - 1">
							<template #icon>
								<n-icon><AddCircle/></n-icon>
							</template>
						</n-button>
						<n-button ghost type="error" v-else @click="onDeleteTag(index)">
							<template #icon>
								<n-icon><CloseCircle/></n-icon>
							</template>
						</n-button>
          </n-input-group>
        </n-flex>
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CateType, addCate, editCate } from '@/api/product/category'
import { AddCircleOutline as AddCircle, CloseCircleOutline as CloseCircle } from '@vicons/ionicons5'

const emit = defineEmits<{
  'on-success': [cate: CateType]
}>()

const model = defineModel({
  type: Boolean,
	required: true
})
const cateForm = defineModel<CateType>('cateForm', {
	required: true
})
const cateFormRules = {
  title: {
    required: true,
    message: '请输入分类名称',
    trigger: 'blur',
  },
}

const editCateForm = ref()
const submiting = ref(false)

/**
 * 新增属性标签
 */
const onAddNewTag = () => {
  cateForm.value?.paramsList?.push({
    key: '',
    values: '',
  })
}

/**
 * 删除临时添加的标签
*/
const onDeleteTag = (index: number) => {
	cateForm.value.paramsList?.splice(index, 1)
}

// 新增或者编辑操作
const onAddOrEditAction = () => {
  return new Promise((resolve) => {
    editCateForm.value?.validate(async (errors) => {
      if (!errors) {
				submiting.value = true
        let res: any
        if (cateForm.value.id) {
          res = await editCate(cateForm.value)
        } else {
          res = await addCate(cateForm.value)
        }
				submiting.value = false
        emit('on-success', res?.data)
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}
</script>
