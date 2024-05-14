<template>
  <n-form ref="filterForm" inline :label-width="120" :model="filterForm">
		<n-form-item label="商品编码:" path="productCode">
			<n-input placeholder="请输入商品编码" v-model:value="filterForm.productCode"</n-input>
		</n-form-item>
		<n-form-item label="商品名称:" path="productName">
			<n-input placeholder="请输入商品名称" v-model:value="filterForm.productName"</n-input>
		</n-form-item>
		<n-form-item :label-width="0">
			<n-button type="primary" @click="onSearch">搜索</n-button>
			<n-button @click="onReset">重置</n-button>
		</n-form-item>
	</n-form>
	<n-table striped bordered :loading="loading" :data="productList" :columns="productColumns"></n-table>
</template>

<script setup lang="ts">
	import { reactive, ref, h, toRaw, onMounted } from 'vue'
	import { useRouter } from 'vue-router'
	import { ProductType, getProductList, upOrDownShelves } from '@/api/product/product.ts'
	import { NImage, NFlex, NButton, useMessage, useDialog } from 'naive-ui'
	import QuickEditPriceView from './component/QuickEditPriceView.vue'

	const router = useRouter()
	const message = useMessage()
	consg dialog = useDialog()
	let filterForm = reactive({
		productCode: '',
		productName: '',
		pageIndex: 1,
		pageSize: 20,
		total: 0
	})
	const originalFilter = toRaw(filterForm)	// 原始过滤器
	const loading = ref(false)
	const productList = reactive<Array<ProductType>>([])
	const productColumns = [
		{ title: '序号' },
		{ title: '商品图片', render: (row: ProductType) => h(NImage, { src: row.masterPic, alt: row.name }) },
		{ title: '商品名称', ellipsis: true },
		{ title: '所属分类', key: 'category' },
		{ title: '商品slug', key: 'slug' },
		{ title: '价格', key: 'price', render: (row: ProductType) => h(QuickEditPriceView, { itemInfo: row }) },
		{ title: '操作', render: (row: ProductType) => h(
			NFlex, () => [
				h(NButton, { text: true, onClick: toDetail.bind(null, row) }, () => '编辑'),
				h(NButton, { text: true, onClick: upOrDownShelf.bind(null, row) }, () => '上架'),
			]
		) }
	]
	onMounted(() => {
		getProductList(filterForm)
	})

	// 跳转到商品详情
	const toDetail = (row: ProductType): void => {
		router.push({
			name: 'product_edit',
			query: {
				id: row.id
			}
		})
	}

	// 商品上下架动作
	const upOrDownShelf = async (row: ProductType) => {
		dialog.warning({
			title: '温馨提示',
			content: `您确定要下架"${row.name}"吗？`,
			negativeText: '我再想想🤔',
			positiveText: '确定',
			onPositiveClick: () => {
				const res = await upOrDownShelves({
					id: row.id
				})
				message.success(res.message)
			}
		})
	}
	// 搜索
	const onSearch = () => {
		getProductList(filterForm)
	}
	// 重置
	const onReset = () => {
		filterForm = Object.assign(filterForm, originalFilter)
		getProductList(filterForm)
	}
</script>
