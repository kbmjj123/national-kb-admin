<template>
  <n-card
    class="h-[100%]"
    :bordered="false"
    :title="stasticsInfo.values.title"
    size="small"
    :segmented="{ content: true, footer: true }">
    <template #header-extra>
      <n-button bordered ghost :type="stasticsInfo.values.statisticalDimensionsType" size="tiny">{{
        stasticsInfo.values.statisticalDimensions
      }}</n-button>
    </template>
    <n-statistic tabular-nums>
      <n-number-animation ref="numberAnimationInstRef" :from="0" :to="stasticsInfo.values.todayValue" />
    </n-statistic>
    <!-- 同比信息 -->
    <n-flex justify="space-between" v-if="'text' === stasticsInfo.values.type">
      <n-text> {{ stasticsInfo.values.contentLeft }}{{ stasticsInfo.values.dayPercentage }} </n-text>
      <n-text> {{ stasticsInfo.values.contentRight }}{{ stasticsInfo.values.weekPercentage }} </n-text>
    </n-flex>
    <!-- 进度条 -->
    <n-progress
      type="line"
      v-else-if="'progress' === stasticsInfo.values.type"
      indicator-placement="inside"
      :color="themeVars.infoColor"
      :rail-color="changeColor(themeVars.infoColor, { alpha: 0.2 })"
      :percentage="50"
      processing></n-progress>
    <!-- 底部汇总 -->
    <template #footer>
      <n-flex justify="space-between">
        <n-text>
          {{ stasticsInfo.values.footerLeft }}
        </n-text>
        <n-text>
          {{ stasticsInfo.values.total }}
        </n-text>
      </n-flex>
    </template>
  </n-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { StasticsItemType } from '@/api/system/statistics.ts'
import { NumberAnimationInst, useThemeVars } from 'naive-ui'
import { changeColor } from 'seemly'
import { CaretUpOutlined, CaretDownOutlined } from '@vicons/antd'

const themeVars = useThemeVars()

const { stasticsInfo } = defineProps<{
  stasticsInfo: StasticsItemType
}>()
const numberAnimationInstRef = ref<NumberAnimationInst | null>()
onMounted(() => {})
</script>
