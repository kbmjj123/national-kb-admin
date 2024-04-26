<template>
  <n-modal
    v-model:show="model"
    preset="dialog"
    title="编辑品牌"
    negative-text="取消"
    positive-text="确定"
    @positive-click="onAddOrEditAction">
    <n-form
      inline
      label-placement="left"
      label-width="auto"
      ref="editBrandForm"
      :model="brandForm"
      :rules="brandFormRules">
      <n-form-item label="品牌名称: " path="name">
        <n-input v-model:value="brandForm.name" placeholder="请输入品牌名称"></n-input>
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { BrandType, addBrand, editBrand } from '@/api/product/brand'

const { itemInfo } = defineProps<{
  itemInfo: BrandType
}>()

const emit = defineEmits<{
  'on-success': []
}>()

const model = defineModel({ type: Boolean })

const brandForm = reactive<BrandType>({
  id: '',
  name: '',
})
const editBrandForm = ref()
const brandFormRules = {
  name: {
    required: true,
    message: '请输入品牌名称',
    trigger: 'blur',
  },
}
watch(model, (newVal) => {
  if (newVal) {
    brandForm.id = itemInfo.id
    brandForm.name = itemInfo.name
  }
})

// 新增或者编辑操作
const onAddOrEditAction = () => {
	return new Promise(resolve => {
		editBrandForm.value?.validate(async (errors) => {
			if (!errors) {
				if (brandForm.id) {
					await editBrand(brandForm)
				} else {
					await addBrand(brandForm)
				}
				emit('on-success')
				resolve(true)
			}else{
				resolve(false)
			}
		})
	})
}
</script>
