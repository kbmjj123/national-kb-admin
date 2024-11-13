<template>
  <n-form-item label="商品图片" path="descPic" ref="descPic">
    <n-flex>
      <div class="relative" v-for="(item, index) in itemInfo.descPic" :key="index">
        <!-- <n-image show-toolbar-tooltip lazy height="80px" width="80px" :src="item"></n-image> -->
        <Uploader
          :options="{
            uploadPath: 'product/master',
            max: 1,
          }"></Uploader>
        <n-button
          block
					ghost
          type="primary"
          size="small"
          v-if="index === computedMasterIndex"
          class="absolute top-0 left-0 right-0">
          设为主图
        </n-button>
      </div>
    </n-flex>
  </n-form-item>
</template>

<script setup lang="ts">
import { ref, onMounted, inject, computed } from 'vue'
import { ProductType } from '@/api/product/product.ts'

const { itemInfo } = defineProps<{
  itemInfo: ProductType
}>()

/**
 * 当前选中的主图下标
 */
const computedMasterIndex = computed(() => {
  if (itemInfo.masterPicture) {
    return itemInfo.descPic.findIndex((item) => item === itemInfo.masterPicture) || 0
  } else {
    return 0
  }
})

const descPic = ref()
const registerItemRef = inject('registerItemRef') as (prop: string, el: HTMLElement) => void
onMounted(() => {
  if (descPic.value) {
    registerItemRef('descPic', descPic.value?.$el)
  }
})
</script>
