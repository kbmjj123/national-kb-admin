<template>
	<n-form
		ref="brandFormRef"
		inline
		label-placement="left"
		label-width="auto"
		:model="brandForm"
		>
		<n-form-item label="品牌关键词" path="key">
			<n-input v-model:value="brandForm.key" placeholder="请输入品牌关键词" clearable></n-input>
		</n-form-item>
		<n-form-item :label-width="0">
			<n-space>
				<n-button type="primary" @click="getBrandListAction">搜索</n-button>
				<n-button>重置</n-button>
				<n-button type="primary" @click="onAddBrand">新增</n-button>
			</n-space>
		</n-form-item>
	</n-form>
	<n-data-table
		bordered
		bottom-bordered
		:single-line="false"
		:columns="columns"
		:data="brandList"
		:loading="loading"
		:pagination="pagination"
	></n-data-table>
	<!-- 新增或编辑视图 -->
	<EditBrandModal v-model="showBrand" :item-info="currentBrand"></EditBrandModal>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted, h, Ref } from 'vue'
	import { type DataTableColumns, useDialog, NSpace, NButton } from 'naive-ui'
	import { BrandType, getBrandList, deleteBrand } from '@/api/product/brand'
	import EditBrandModal from './component/EditBrandModal.vue';

	const brandForm = reactive({
		key: ''
	})

	const columns: Ref<DataTableColumns> = ref([
		{
			title: '品牌名称',
			key: 'name',
			align: 'center'
		},
		{
			title: '操作',
			key: 'action',
			render: (row) => h(NSpace, [
				h(NButton, { type: 'primary', text: true, onClick: () => onEditBrand(row) }, '编辑'),
				h(NButton, { type: 'warning', text: true, onClick: () => onDeleteBrand(row) }, '删除'),
			])
		}
	])

	let brandList: Ref<Array<BrandType>> = ref([])

	const showBrand = ref(false)
	let currentBrand = reactive<BrandType>({
		id: '',
		name: ''
	})

	const loading = ref(false)
	const params = reactive({
		pageIndex: 0,
		pageSize: 20,
		total: 0,
		key: ''
	})
	const pagination = reactive({
		page: params.pageIndex,
		pageSize: params.pageSize,
		pageSizes: [10, 20, 30],
		pageCount: 20,
		showQuickJumper: true,
		showSizePicker: true,
		itemCount: params.total,
		onChange: (page: number) => {
			pagination.page = page
			getBrandListAction()
		},
		onUpdatePageSize: (pageSize: number) => {
			pagination.pageSize = pageSize
			pagination.page = 1
			getBrandListAction()
		}
	})
	// 获取分类列表数据
	const getBrandListAction = async () => {
		loading.value = true
		const res = await getBrandList(params)
		loading.value = false
		brandList.value = res.data.list
		params.total = res.data.total
		pagination.page = res.data.pageIndex
	}

	const onAddBrand = () => {
		currentBrand.id = ''
		currentBrand.name = ''
		showBrand.value = true
	}

	const onEditBrand = (row) => {
		currentBrand.id = row.id
		currentBrand.name = row.name
		showBrand.value = true
	}

	const dialog = useDialog()
	const onDeleteBrand = (row) => {
		const dialogInstance = dialog.warning({
			title: '温馨提示',
			content: `您确定要删除品牌：【${row.name}】吗`,
			negativeText: '我再想想',
			positiveText: '确定',
			onPositiveClick: async () => {
				await deleteBrand(row.id)
				dialogInstance.destroy()
			}
		})
	}

	onMounted(() => {
		getBrandListAction()
	})

</script>