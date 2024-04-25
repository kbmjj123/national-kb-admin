<template>
	<n-button type="primary" @click="onShowModal">新增</n-button>
	<n-modal v-model:show="showModal"
		preset="dialog"
		title="编辑品牌"
		@negative-click="onHideModal"
		@positive-click="onAddOrEditAction"
	>
		<n-form inline ref="editBrandForm" :model="brandForm" :rules="brandFormRules">
			<n-form-item label="品牌名称: ">
				<n-input v-model:value="brandForm.brandName" placeholder="请输入品牌名称"></n-input>
			</n-form-item>
		</n-form>
	</n-modal>
</template>

<script setup lang="ts">
	import { ref, reactive } from 'vue'
	const showModal = ref(false)
	const onShowModal = () => {
		showModal.value = true
	}
	const onHideModal = () => {
		showModal.value = false
	}
	const brandForm = reactive({
		brandName: ''
	})
	const editBrandForm = ref()
	const brandFormRules = {
		brandName: {
			required: true,
			message: '请输入品牌名称',
			trigger: 'blur'
		}
	}
	// 新增或者编辑操作
	const onAddOrEditAction = () => {

	}
</script>