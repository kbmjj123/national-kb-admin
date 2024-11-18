<template>
  <n-form-item label="商品图片" path="descPic" ref="descPic">
    <n-flex>
      <div class="flex gap-2 flex-col" v-for="(item, index) in itemInfo.descPic" :key="index">
        <Uploader
					:file="item"
					@update:file="onUpdateFile"
          :options="{
            uploadPath: 'product/master',
            max: 1,
						uploadDragger: 'single',
						index
          }"></Uploader>
        <n-button block ghost type="primary" size="small" @click="onSetMasterPic"> 设为主图 </n-button>
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

const onUpdateFile = ({file, index}) => {
	itemInfo.descPic[index] = file
}

/**
 * 设置主图
 */
const onSetMasterPic = () => {
	
}


const descPic = ref()
const registerItemRef = inject('registerItemRef') as (prop: string, el: HTMLElement) => void
onMounted(() => {
  if (descPic.value) {
    registerItemRef('descPic', descPic.value?.$el)
  }
})
</script>
