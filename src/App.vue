<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="theme">
    <application>
      <RouterView />
			<DrawerWrapper></DrawerWrapper>
    </application>
  </n-config-provider>
</template>

<script setup lang="ts">
import { zhCN, dateZhCN, darkTheme } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'
import { ref } from 'vue'
const theme = ref<GlobalTheme | null>(null)
import { useDrawer } from '@/hooks/web/useDrawer.ts'
const { DrawerWrapper } = useDrawer()
// const getDarkTheme = computed(() => )
</script>

<style lang="less">
@import 'styles/index.less';
</style>
