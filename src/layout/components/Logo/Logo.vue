<template>
  <div class="flex align-center justify-center h-[64px] leading-[64px] overflow-hidden whitespace-nowrap">
    <img :src="websiteConfig.logo" alt="" class="w-auto h-8" :class="{ 'mr-2': !collapsed }">
    <h2 v-show="!collapsed" class="m-0">{{ websiteConfig.title }}</h2>
  </div>
</template>

<script setup lang="ts">
  import websiteConfig from '@/config/websiteConfig'
  defineProps<{
    collapsed: boolean
  }>()
</script>