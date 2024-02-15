<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="theme">
    <application>
      <RouterView/>
    </application>
  </n-config-provider>
</template>

<script setup lang="ts">
import { zhCN, dateZhCN, darkTheme } from 'naive-ui';
import type { GlobalTheme } from 'naive-ui'
const theme = ref<GlobalTheme | null>(null)
// const getDarkTheme = computed(() => )
</script>

<style lang="less">
@import 'styles/index.less';
</style>
