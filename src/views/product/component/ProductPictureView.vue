<template>
  <n-form-item label="商品图片: " path="descPic" ref="descPic">
    <n-flex>
      <div class="relative" v-for="(item, index) in itemInfo.descPic" :key="index">
        <n-image show-toolbar-tooltip lazy height="80px" width="80px" :src="item"></n-image>
        <n-button block type="primary" v-if="item === itemInfo.masterPicture" class="absolute top-0 left-0 right-0"> 设为主图 </n-button>
      </div>
    </n-flex>
  </n-form-item>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import { ProductType } from '@/api/product/product.ts'

const { itemInfo } = defineProps<{
	itemInfo: ProductType
}>()

const descPic = ref()
const registerItemRef = inject('registerItemRef') as (prop: string, el: HTMLElement) => void
onMounted(() => {
	if(descPic.value){
		registerItemRef('descPic', descPic.value?.$el)
	}
})
</script>
