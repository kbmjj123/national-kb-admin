<template>
  <n-form>
    <n-form-item>
      <n-select placeholder="请选择商品分类" v-model:value="filterForm.category"></n-select>
    </n-form-item>
    <n-form-item>
      <n-input placeholder="请输入商品名称" v-model:value="filterForm.productName"></n-input>
    </n-form-item>
    <n-form-item>
      <n-flex>
        <n-button type="primary" @click="onQuery">搜索</n-button>
        <n-button @click="onReset">重置</n-button>
      </n-flex>
    </n-form-item>
  </n-form>
  <n-data-table
    bordered
    :loading="loading"
    :single-line="false"
    :single-column="false"
    :columns="stockColumns"
    :data="result?.data.list"></n-data-table>
  <!-- 入库对话框 -->
  <InStockModal v-model="showInStockFlag" :product-item="currentInStockProduct"></InStockModal>
</template>

<script setup lang="ts">
import { onMounted, reactive, markRaw, h, ref } from 'vue'
import { useLoading } from '@/hooks/web/useLoading.ts'
import { useDrawer } from '@/hooks/web/useDrawer.ts'
import { StockType, getStockList } from '@/api/product/stock.ts'
import { DataTableColumns, NFlex, NButton } from 'naive-ui'
import InStockModal from './component/InStockModal.vue'
const { showDetail } = useDrawer()

const { loading, execute, result } = useLoading(getStockList)

const filterForm = reactive({
  category: '',
  productName: '',
})
const originalFilter = markRaw(filterForm)

const stockColumns: DataTableColumns<StockType> = [
  { title: '序号', key: 'index', width: 60, align: 'center' },
  { title: 'slug', key: 'slug', width: 100, align: 'center' },
  { title: '商品名称', key: 'productName', minWidth: 150 },
  { title: '当前库存', key: 'currentStock', minWidth: 100, align: 'center' },
  { title: '锁定库存', key: 'currentStock', minWidth: 100, align: 'center' },
  { title: '在途库存', key: 'currentStock', minWidth: 100, align: 'center' },
  { title: '库存总量', key: 'currentStock', minWidth: 100, align: 'center' },
  {
    title: '操作',
    key: 'action',
    width: 120,
    align: 'center',
    render: (rowData: StockType) =>
      h(NFlex, () => [
        h(
          NButton,
          {
            text: true,
            type: 'primary',
            onClick: () => {
              itemInStock(rowData)
            },
          },
          () => '入库',
        ),
        h(
          NButton,
          {
            text: true,
            type: 'info',
            onClick: () => {
              showDetail('stock-detail', { id: rowData.id, title: '库存变动详情' })
            },
          },
          () => '变动历史',
        ),
      ]),
  },
]
const showInStockFlag = ref(false)
const currentInStockProduct = ref<StockType | null>(null)
const itemInStock = (productItem: StockType) => {
  currentInStockProduct.value = productItem
  showInStockFlag.value = true
}

onMounted(() => {
  onQuery()
})
const onQuery = () => {
  execute && execute()
}
const onReset = () => {
  Object.assign(filterForm, originalFilter)
}
</script>
