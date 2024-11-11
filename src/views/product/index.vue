<template>
  <n-form ref="filterForm" inline label-width="auto" label-placement="left" :model="filterForm">
    <n-form-item label="商品编码:" path="productCode">
      <n-input placeholder="请输入商品编码" v-model:value="filterForm.productCode"></n-input>
    </n-form-item>
    <n-form-item label="商品名称:" path="productName">
      <n-input placeholder="请输入商品名称" v-model:value="filterForm.productName"></n-input>
    </n-form-item>
    <n-form-item :label-width="0">
      <n-button class="mr-2" type="primary" @click="onSearch">搜索</n-button>
      <n-button @click="onReset">重置</n-button>
    </n-form-item>
  </n-form>
  <n-data-table
    striped
    bordered
    :single-line="false"
    :pagination="pagination"
    :loading="loading"
    :data="productList"
    :columns="productColumns"></n-data-table>
</template>

<script setup lang="ts">
import { reactive, ref, h, toRaw, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ProductType, getProductList, upOrDownShelves } from '@/api/product/product.ts'
import { type DataTableColumns, NImage, NFlex, NButton, useMessage, useDialog } from 'naive-ui'
import QuickEditPriceView from './component/QuickEditPriceView.vue'

const router = useRouter()
const message = useMessage()
const dialog = useDialog()
let filterForm = reactive({
  productCode: '',
  productName: '',
  pageIndex: 1,
  pageSize: 20,
  total: 0,
})
const originalFilter = toRaw(filterForm) // 原始过滤器
const loading = ref(false)
const productList = ref<Array<ProductType>>([])
const productColumns: DataTableColumns<ProductType> = [
  { title: '序号', width: 60, key: 'index', render: (row, index: number) => h('span', index + 1) },
  {
    title: '商品图片',
    align: 'center',
    key: 'masterPicture',
    width: 90,
    render: (row: ProductType) => h(NImage, { src: row.masterPicture, alt: row.productName, lazy: true }),
  },
  { title: '商品名称', key: 'productName', minWidth: 150 },
  { title: '所属分类', align: 'center', width: 140, key: 'category' },
  { title: '商品slug', align: 'center', width: 100, key: 'slug' },
  {
    title: '价格(¥)',
    align: 'center',
    width: 90,
    key: 'price',
    render: (row: ProductType) => h(QuickEditPriceView, { itemInfo: row }),
  },
  {
    title: '操作',
    fixed: 'right',
    key: 'action',
    width: 100,
    render: (row: ProductType) =>
      h(NFlex, () => [
        h(NButton, { text: true, type: 'primary', onClick: toDetail.bind(null, row) }, () => '编辑'),
        h(NButton, { text: true, type: 'primary', onClick: upOrDownShelf.bind(null, row) }, () => '上架'),
      ]),
  },
]
const pagination = { pageSize: 10 }
onMounted(() => {
  getProductListAction()
})

// 跳转到商品详情
const toDetail = (row: ProductType): void => {
  router.push({
    name: 'product_edit',
    query: {
      id: row.id,
    },
  })
}

// 商品上下架动作
const upOrDownShelf = async (row: ProductType) => {
  dialog.warning({
    title: '温馨提示',
    content: `您确定要下架"${row.productName}"吗？`,
    negativeText: '我再想想🤔',
    positiveText: '确定',
    onPositiveClick: async () => {
      const res = await upOrDownShelves({
        id: row.id,
      })
      message.success(res.message)
    },
  })
}
const getProductListAction = async () => {
  loading.value = true
  const res = await getProductList({
		pageIndex: 1,
		pageSize: 20
	})
  productList.value = res.data.list.map((item) => ({
    ...item,
    price: `${item.price}`,
    cachePrice: `${item.price}`,
  }))
  loading.value = false
}
// 搜索
const onSearch = () => {
  getProductListAction()
}
// 重置
const onReset = () => {
  filterForm = Object.assign(filterForm, originalFilter)
  getProductListAction()
}
</script>
