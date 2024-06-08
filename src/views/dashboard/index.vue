<template>
  <n-grid item-responsive cols="1 s:2 m:2 l:4 xl:4 2xl:4" :x-gap="12" :y-gap="12" responsive="screen">
    <n-grid-item v-for="(item, index) in finalStasticsInfo" :key="index">
      <TotalStasticsItem :stasticsInfo="item"></TotalStasticsItem>
    </n-grid-item>
  </n-grid>
  <n-grid class="mt-3" item-responsive cols="1 s:4 m:4 l:8 xl:8 2xl:8" :x-gap="12" :y-gap="12" responsive="screen">
    <n-grid-item v-for="(item, index) in navigateList" :key="index">
      <n-card content-style="padding-top: 0;" size="small" :bordered="false" content-class="p-4">
        <n-flex vertical align="center" justify="center">
          <n-icon :color="item.color" @click="item.clickAction" :size="24">
            <component :is="item.icon" />
          </n-icon>
          <n-text>{{ item.title }}</n-text>
        </n-flex>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getTotalStastisticsInfo } from '@/api/system/statistics.ts'
import { useLoading } from '@/hooks/web/useLoading.ts'
import TotalStasticsItem from './component/TotalStasticsItem.vue'
import {
  UsergroupAddOutlined,
  BarChartOutlined,
  ShoppingCartOutlined,
  AccountBookOutlined,
  ProfileOutlined,
  StockOutlined,
  CarryOutOutlined,
  SettingOutlined,
} from '@vicons/antd'

const router = useRouter()
const { loading, result, execute } = useLoading(getTotalStastisticsInfo)
const CONSTANT_MAP = {
  visits: {
    title: '访问量',
    type: 'text',
    statisticalDimensionsType: 'primary',
    contentLeft: '日同比',
    contentRight: '周同比',
    footerLeft: '总访问量',
  },
  sales: {
    title: '销售额',
    aheadSlot: '¥',
    statisticalDimensionsType: 'info',
    type: 'progress',
    footerLeft: '总销售额',
  },
  orders: {
    title: '订单量',
    type: 'text',
    statisticalDimensionsType: 'warning',
    contentLeft: '日同比',
    contentRight: '周同比',
    footerLeft: '转化率',
  },
  deals: {
    title: '成交额',
    type: 'text',
    statisticalDimensionsType: 'error',
    aheadSlot: '¥',
    contentLeft: '月同比',
    contentRight: '季同比',
    footerLeft: '总成交额',
  },
}
const finalStasticsInfo = computed(() => {
  return result.value?.data?.map((item) => {
    return {
      ...item,
      values: {
        ...item.values,
        ...CONSTANT_MAP[item.key],
      },
    }
  })
})
//? 以下是对应的导航入口列表
const navigateList = [
  {
    icon: UsergroupAddOutlined,
    size: 32,
    title: '用户',
    color: '#69c0ff',
    clickAction: () => {
      router.push({
        name: 'account_manage',
      })
    },
  },
  {
    icon: BarChartOutlined,
    size: 32,
    title: '分析',
    color: '#69c0ff',
    clickAction: () => {},
  },
  {
    icon: ShoppingCartOutlined,
    size: 32,
    title: '商品',
    color: '#ff9c6e',
    clickAction: () => {
      router.push({
        name: 'product_manage',
      })
    },
  },
  {
    icon: AccountBookOutlined,
    size: 32,
    title: '订单',
    color: '#b37feb',
    clickAction: () => {
      router.push({
        name: 'order_manage',
      })
    },
  },
  {
    icon: ProfileOutlined,
    size: 32,
    title: '核销',
    color: '#ffd666',
    clickAction: () => {
      router.push({
        name: 'order_write_off',
      })
    },
  },
  {
    icon: StockOutlined,
    size: 32,
    title: '库存',
    color: '#5cdbd3',
    clickAction: () => {},
  },
  {
    icon: CarryOutOutlined,
    size: 32,
    title: '待办',
    color: '#ff85c0',
    clickAction: () => {},
  },
  {
    icon: SettingOutlined,
    size: 32,
    title: '配置',
    color: '#ffc069',
    clickAction: () => {
      router.push({
        name: 'setting_manage',
      })
    },
  },
]

onMounted(() => {
  execute && execute()
})
</script>
