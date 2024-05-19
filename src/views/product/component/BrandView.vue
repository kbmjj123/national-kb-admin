<template>
  <n-form-item label="品牌: ">
    <n-flex class="w-[100%]">
      <n-select clearable placeholder="请选择品牌" class="w-[50%]">
        <template #empty>
          <EmptyGuide @on-guide="onAddBrand"></EmptyGuide>
        </template>
      </n-select>
      <n-button text type="primary" @click="onAddBrand"
        >新增品牌<n-icon><ChevronForwardCircleOutline></ChevronForwardCircleOutline></n-icon
      ></n-button>
    </n-flex>
  </n-form-item>
</template>

<script setup lang="ts">
import { ChevronForwardCircleOutline } from '@vicons/ionicons5'
const onAddBrand = () => {}
</script>
