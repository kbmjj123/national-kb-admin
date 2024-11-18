<template>
  <n-form-item label="品牌" path="brand" ref="brand">
    <n-flex class="w-[100%]">
      <n-select
        clearable
				filterable
        placeholder="请选择品牌"
        class="w-[50%]"
        label-field="name"
        value-field="id"
				v-model:value="itemInfo.brandId"
				:loading="loading"
        :options="result?.data">
        <template #empty>
          <EmptyGuide @on-guide="onAddBrand"></EmptyGuide>
        </template>
      </n-select>
      <n-button text type="primary" @click="onAddBrand"
        >品牌管理<n-icon><ChevronForwardCircleOutline></ChevronForwardCircleOutline></n-icon
      ></n-button>
    </n-flex>
  </n-form-item>
</template>

<script setup lang="ts">
import { type Ref, ref, onMounted, inject } from 'vue'
import { ChevronForwardCircleOutline } from '@vicons/ionicons5'
import { BrandType, getAllBrandList } from '@/api/product/brand'
import { useLoading } from '@/hooks/web/useLoading'
import { ProductType } from '@/api/product/product';
const { result, execute, loading } = useLoading(getAllBrandList)

const onAddBrand = () => {}

const { itemInfo } = defineProps<{
  itemInfo: ProductType
}>()

const brand = ref()
const registerItemRef = inject('registerItemRef') as (prop: string, el: HTMLElement) => void

let brandList: Ref<Array<BrandType>> = ref([])

onMounted(() => {
  if (brand.value) {
    registerItemRef('brand', brand.value?.$el)
  }
  execute && execute()
})
</script>
