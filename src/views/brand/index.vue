<template>
	<n-form
		ref="brandFormRef"
		inline
		:model="brandForm"
		:label-width="80">
		<n-form-item label="品牌关键词" path="key">
			<n-input v-model:value="brandForm.key" placeholder="请输入品牌关键词" clearable></n-input>
		</n-form-item>
		<n-form-item :label-width="0">
			<n-button type="primary" @click="getBrandList">搜索</n-button>
			<n-button>重置</n-button>
		</n-form-item>
	</n-form>
	<n-data-table
		bordered
		bottom-bordered
		:columns="columns"
		:data="brandList"
		:loading="loading"
		:pagination="pagination"
	></n-data-table>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted, Ref } from 'vue'
	import type { DataTableColumns } from 'naive-ui'

	const brandForm = reactive({
		key: ''
	})

	const columns: Ref<DataTableColumns> = ref([
		{
			title: '',
			key: ''
		}
	])

	const brandList = ref([])

	const loading = ref(false)
	const params = reactive({
		pageIndex: 0,
		pageSize: 20,
		key: ''
	})
	const pagination = reactive({
		page: params.pageIndex,
		pageSize: params.pageSize,
		showSizePicker: true,
		onChange: (page: number) => {
			pagination.page = page
			getBrandList()
		},
		onUpdatePageSize: (pageSize: number) => {
			pagination.pageSize = pageSize
			pagination.page = 1
			getBrandList()
		}
	})
	// 获取分类列表数据
	const getBrandList = () => {
		
	}

	onMounted(() => {
		getBrandList()
	})

</script>