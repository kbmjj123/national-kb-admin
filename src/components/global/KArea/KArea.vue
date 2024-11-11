<template>
  <n-flex align="center" class="text-base p-2" :style="{color: themeVars.textColorBase}">
    <span class="inline-block w-1 h-5 rounded-sm" :style="{background: themeVars.primaryColor}"></span>
    <span class="font-normal text-base">{{ title }}</span>
    <slot name="append"></slot>
  </n-flex>
  <!-- 默认的内容 -->
  <slot></slot>
</template>

<script setup lang="ts">
import { useThemeVars } from 'naive-ui'
const themeVars = useThemeVars()

const { title } = defineProps<{
  title?: string
}>()
</script>
