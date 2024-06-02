<template>
  <n-layout>
    <n-layout-content class="p-4">
      <n-form ref="queryFormRef" :model="queryForm" :rules="queryRules" :show-label="false" class="w-[50%] m-auto mb-5">
        <n-form-item path="key">
          <n-input-group>
            <n-input placeholder="请输入会员码或核销码或订单号" v-model:value="queryForm.key as string"></n-input>
            <n-button type="primary" @click="queryAction" :loading="loading">
              <template #icon>
                <n-icon>
                  <Search></Search>
                </n-icon>
              </template>
              搜索
            </n-button>
          </n-input-group>
        </n-form-item>
      </n-form>
      <KArea v-if="result?.data.list && result?.data.list.length > 0" title="可提货订单">
        <n-data-table
          bordered
          :single-column="false"
          :loading="loading"
          :data="result?.data.list"
          default-expand-all
          :columns="orderColumns"></n-data-table>
      </KArea>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, h } from 'vue'
import { useRoute } from 'vue-router'
import { Search } from '@vicons/ionicons5'
import { useLoading } from '@/hooks/web/useLoading.ts'
import { OrderType, getWriteOffOrderList, writeOffOrder } from '@/api/order/order.ts'
import { productColumns } from '../component/productConstants.ts'
import { type DataTableColumns, NButton, useDialog, NDataTable } from 'naive-ui'

const route = useRoute()
const dialog = useDialog()
const queryForm = reactive({
  key: route.query?.id || '',
})
const queryRules = {
  key: [{ required: true, trigger: 'blur', message: '请输入会员码或核销码或订单号' }],
}
const queryFormRef = ref()
const { loading, execute, result } = useLoading(getWriteOffOrderList)
const id = route.query?.id

const orderColumns: DataTableColumns<OrderType> = [
  {
    type: 'selection',
  },
  {
    title: '订单号',
    key: 'orderNo',
  },
	{
		type: 'expand',
		expandable: (rowData: OrderType) => rowData.productList?.length > 0,
		renderExpand: (rowData: OrderType) => {
			return h(NDataTable, {
				data: rowData.productList,
				bordered: true,
				singleLine: false,
				columns: productColumns
			})
		}
	},
  {
    title: '提货人',
    key: 'buyerInfo',
		render: (rowData: OrderType) => h('span', rowData.buyerInfo.name)
  },
	{
    title: '预约提货时间',
    key: '',
  },
  {
    title: '操作',
    key: 'action',
    render: (rowData: OrderType) =>
      h(NButton, { text: true, type: 'primary', onClick: () => writeOffAction(rowData.id) }, () => '核销'),
  },
]

onMounted(() => {
  id && execute(id)
})
// 核销动作
const writeOffAction = (id) => {
	const writeOffing = ref(false)
	dialog.warning({
		title: '温馨提示',
		content: `您确定要对该订单进行核销吗？`,
		negativeText: '取消',
		positiveText: '确定',
		positiveButtonProps: {
			loading: writeOffing.value
		},
		onPositiveClick: async () => {
			writeOffing.value = true
			await writeOffOrder({id})
			writeOffing.value = false
		}
	})
}

const queryAction = () => {
  queryFormRef.value?.validate((errors) => {
    if (!errors || 0 === errors.length) {
      execute(queryForm.key)
    }
  })
}
</script>
