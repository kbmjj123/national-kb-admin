<template>
	<n-modal
		v-model:show="model"
		preset="dialog"
		title="编辑分类"
		negative-text="取消"
		positive-text="确定"
		@positive-click="onAddOrEditAction"
	>
		<n-form inline label-placement="left" label-width="auto" ref="editCateForm" :model="cateForm" :rules="cateFormRules">
			<n-form-item></n-form-item>
		</n-form>
	</n-modal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { CateType, addCate, editCate } from '@/api/product/category'

const { itemInfo } = defineProps<{
	itemInfo: CateType
}>()

const emit = defineEmits<{
	'on-success': [cate: CateType]
}>()

const model = defineModel({
	type: Boolean
})
const cateFormRules = {
	name: {
		required: true,
		message: '请输入分类名称',
		trigger: 'blur'
	}
}

watch(model, (newVal) => {
	if(newVal){
		cateForm.id = itemInfo.id
		cateForm.name = itemInfo.name
	}
})

const editCateForm = ref()
const cateForm = reactive<CateType>({
	id: '',
	name: ''
})

// 新增或者编辑操作
const onAddOrEditAction = () => {
	return new Promise(resolve => {
		editCateForm.value?.validate(async (errors) => {
			if(!errors){
				let res: any
				if(cateForm.id){
					res = await editCate(cateForm)
				}else{
					res = await addCate(cateForm)
				}
				emit('on-success', res?.data)
				resolve(true)
			}else{
				resolve(false)
			}
		})
	})
}

</script>