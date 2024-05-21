<template>
  <n-form-item label="商品slug: " path="slug" ref="slug">
    <n-flex class="w-[100%]" :wrap="false">
      <n-input-group class="w-[50%]">
        <n-input-group-label>kb-</n-input-group-label>
        <n-input placeholder="请输入商品slug" clearable></n-input>
      </n-input-group>
      <n-button text type="primary" @click="">检测唯一性</n-button>
    </n-flex>
  </n-form-item>
</template>

<script setup lang="ts">
import { onMounted, inject } from 'vue'
import { ProductType } from '@/api/product/product'

const { itemInfo } = defineProps<{
	itemInfo: ProductType
}>()
const slug = ref()
const registerItemRef = inject('registerItemRef') as (prop: string, el: HTMLElement) => void
onMounted(() => {
	slug.value && registerItemRef('slug', slug.value?.$el)
})

</script>
