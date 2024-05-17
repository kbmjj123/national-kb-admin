<template>
  <n-flex class="text-base" :style="{color: themeVars.textColorBase}">
    <span class="inline-block w-2 h-4" :style="{background: themeVars.primaryColor}"></span>
    <slot name="title"></slot>
    <slot name="append"></slot>
  </n-flex>
  <!-- 默认的内容 -->
  <slot></slot>
</template>

<script setup lang="ts">
import { useThemeVars } from 'naive-ui'
const themeVars = useThemeVars()

defineProps<{
  title?: string
}>()
</script>
