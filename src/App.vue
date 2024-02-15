<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="darkTheme">
    <n-button strong secondary type="primary">
      Primary
    </n-button>
    <n-button type="primary">
      Primary
    </n-button>
  </n-config-provider>
</template>

<script setup lang="ts">
  import { zhCN, dateZhCN, darkTheme } from 'naive-ui';

  // const getDarkTheme = computed(() => )

</script>

<style lang="less">
  @import 'styles/index.less';
</style>
