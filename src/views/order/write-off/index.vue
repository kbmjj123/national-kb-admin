<template>
  <n-layout>
    <n-layout-content class="p-4">
      <n-form ref="queryFormRef" :model="queryForm" :rules="queryRules" :show-label="false" class="w-[50%] m-auto mb-5">
        <n-form-item path="key">
          <n-input-group>
            <n-input placeholder="请输入会员码或核销码或订单号" v-model:value="queryForm.key"></n-input>
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
import { OrderType, getWaitToWriteOffOrderList } from '@/api/order/order.ts'
import { type DataTableColumns, NButton } from 'naive-ui'

const route = useRoute()
const queryForm = reactive({
  key: route.query?.id || '',
})
const queryRules = {
  key: [{ required: true, trigger: 'blur', message: '请输入会员码或核销码或订单号' }],
}
const queryFormRef = ref()
const { loading, execute, result } = useLoading(getWaitToWriteOffOrderList)
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
    title: '提货人',
    key: '',
  },
	{
    title: '预约提货时间',
    key: '',
  },
  {
    title: '操作',
    key: 'action',
    render: (rowData: OrderType) =>
      h(NButton, { text: true, type: 'primary', onClick: writeOffAction(rowData.id) }, () => '核销'),
  },
]

onMounted(() => {
  id && execute(id)
})

const writeOffAction = (id) => {}

const queryAction = () => {
  queryFormRef.value?.validate((errors) => {
    if (!errors || 0 === errors.length) {
      execute(queryForm.key)
    }
  })
}
</script>
