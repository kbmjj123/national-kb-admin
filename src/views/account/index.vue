<template>
  <n-form inline :model="filterForm" label-width="auto" label-placement="left">
    <n-form-item label="状态: ">
      <n-select class="w-[120px]" :options="All_ACCOUNT_STATUS" v-model:value="filterForm.accountStatus"></n-select>
    </n-form-item>
    <n-form-item label="账号: ">
      <n-input placeholder="请输入账号" v-model:value="filterForm.account"></n-input>
    </n-form-item>
    <n-form-item>
      <n-flex>
        <n-button type="primary" @click="queryAction">搜索</n-button>
        <n-button @click="onReset">重置</n-button>
      </n-flex>
    </n-form-item>
  </n-form>
  <n-data-table
    striped
		:single-line="false"
    :columns="columns"
    :loading="loading"
    :data="result?.data?.list"
    :pagination="pagination"
    />
</template>

<script setup lang="ts">
import { h, reactive, onMounted, markRaw, type Ref } from 'vue'
import { NImage, NText, NButton, useDialog, type DataTableColumns } from 'naive-ui'
import { useLoading } from '@/hooks/web/useLoading.ts'
import {
  getAccountListList,
  disabledAccount,
  enabledAccount,
  type AccountType,
  AccountStatus,
} from '@/api/account/account.ts'

const dialog = useDialog()
const { loading, execute, result } = useLoading(getAccountListList)
const filterForm = reactive({
  accountStatus: 0,
  account: '',
})
const originalFilter = markRaw(filterForm)
const columns: Ref<DataTableColumns> = [
  { title: '序号', width: 60, align: 'center', key: 'index', render: (_: AccountType, index: number) => h('span', index + 1) },
  { title: '账号', minWidth: 120, align: 'center', key: 'account' },
  {
    title: '头像',
    width: 80,
		align: 'center',
    key: 'avatar',
    render: (row: AccountType) => h(NImage, { src: row.avatar, width: 50, height: 50 }),
  },
  {
    title: '状态',
    width: 100,
		align: 'center',
    key: 'accountStatus',
    render: (row: AccountType) => h(NText, {}, () => (row.accountStatus === AccountStatus.ENABLED ? '使用中' : '禁用')),
  },
  { title: '创建时间', width: 120, key: 'createTime', align: 'center' },
  { title: '最近登录时间', minWidth: 150, key: 'lastLoginTime' },
  { title: '登录地区', minWidth: 150, key: 'area', align: 'center' },
  {
    title: '操作',
    minWidth: 150,
		fixed: 'right',
		align: 'center',
    key: 'action',
    render: (row: AccountType) =>
      h(
        NButton,
        {
          text: true,
          type: AccountStatus.ENABLED === row.accountStatus ? 'error' : 'primary',
          onClick: () => {
            AccountStatus.ENABLED === row.accountStatus ? disabledAction(row) : enabledAction(row)
          },
        },
        () => (AccountStatus.ENABLED === row.accountStatus ? '禁用' : '启用'),
      ),
  },
]
const All_ACCOUNT_STATUS = [
  {
    label: '全部',
    value: 0,
  },
  {
    label: '启用',
    value: 1,
  },
  {
    label: '禁用',
    value: 2,
  },
  {
    label: '已注销',
    value: 3,
  },
]
const pagination = reactive({})
// 启用账号
const enabledAction = (row: AccountType) => {
  dialog.warning({
    title: '温馨提示',
    content: `您确定要启用账号(${row.account})吗？`,
    positiveText: '确定',
    negativeText: '我再想想',
    onPositiveClick: async () => {
      await enabledAccount({ id: row.id })
      queryAction()
    },
  })
}
// 禁用账号
const disabledAction = (row: AccountType) => {
  dialog.warning({
    title: '温馨提示',
    content: `禁用账号后，将限制该账号在平台中登录使用，您确定要禁用账号(${row.account})吗？`,
    positiveText: '确定',
    negativeText: '我再想想',
    onPositiveClick: async () => {
      await disabledAccount({ id: row.id })
      queryAction()
    },
  })
}
const queryAction = () => {
  execute && execute(filterForm)
}
const onReset = () => {
  Object.assign(filterForm, originalFilter)
}

onMounted(() => {
  queryAction()
})
</script>
