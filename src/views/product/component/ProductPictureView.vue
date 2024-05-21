<template>
  <n-form-item label="商品图片: " path="descPic" ref="descPic">
    <n-flex>
      <div class="relative" v-for="(item, index) in 5" :key="index">
        <n-image show-toolbar-tooltip lazy height="80px" width="80px" :src="testLogo"></n-image>
        <n-button block type="primary" class="absolute top-0 left-0 right-0"> 设为主图 </n-button>
      </div>
    </n-flex>
  </n-form-item>
</template>

<script setup lang="ts">
import testLogo from '@/assets/images/logo.png'

</script>
