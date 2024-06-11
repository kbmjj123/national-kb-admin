<template>
  <n-modal v-model:value="model" title="商品入库" present="dialog" :loading="false" @positive-click="onSaveInStock">
    <n-form :model="stockForm" label-placement="left" label-width="auto" ref="stockFormRef" :rules="stockRules">
      <n-form-item label="商品: ">
        {{ productItem?.name }}
      </n-form-item>
      <n-form-item label="数量: " path="inStockNum">
        <n-input-number placeholder="请输入入库数量" clearable v-model:value="stockForm.inStockNum"></n-input-number>
      </n-form-item>
      <n-form-item label="备注: " path="remark">
        <n-input placeholder="请输入备注信息" clearable v-model:value="stockForm.remark" type="textarea"></n-input>
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { StockType, inStock } from '@/api/product/stock.ts'

const model = defineModel({
  required: true,
  type: Boolean,
})
const { productItem } = defineProps<{
  productItem: StockType | null
}>()
const stockForm = reactive({
  inStockNum: 0,
  remark: '',
})
const stockRules = {
  inStockNum: [{ required: true, message: '请输入入库数量', trigger: 'change' }],
}
const stockFormRef = ref()

const onSaveInStock = () => {
  stockFormRef.value?.validate(async (errors) => {
    if (!errors) {
      await inStock(stockForm)
      model.value = false
    }
  })
}
</script>
