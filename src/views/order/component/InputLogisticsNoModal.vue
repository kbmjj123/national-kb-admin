<template>
  <n-modal
    v-model:show="model"
    title="请输入承运信息"
    preset="dialog"
    negative-text="取消"
    positive-text="保存"
    @positive-click="onSave">
    <n-form
      ref="logisticsForm"
      :model="logisticsInfo"
      :rules="logisticsRules"
      label-placement="left"
      label-width="auto">
      <n-form-item label="承运公司: " path="company">
        <n-select
          placeholder="请选择承运公司"
          v-model:value="logisticsInfo.company"
          label-field="value"
          value-field="key"
					filterable
          :options="allCompany">
        </n-select>
      </n-form-item>
      <n-form-item label="快递单号: " path="logisticsNo">
        <n-input placeholder="请输入快递单号" v-model:value="logisticsInfo.logisticsNo"></n-input>
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { FormValidationError } from 'naive-ui'
import { deliveryOrder } from '@/api/order/order.ts'
import { getLogisticsCompany } from '@/api/system/resources.ts'
import { KeyValue } from '/#/common'

const model = defineModel({
  required: true,
  type: Boolean,
})
const { id } = defineProps<{
  id: string
}>()
const emits = defineEmits<{
  'on-success': []
}>()
const logisticsInfo = reactive({
  company: '',
  logisticsNo: '',
})
const allCompany = ref<KeyValue[]>([])
const logisticsForm = ref()
const logisticsRules = {
  company: [{ required: true, message: '请选择承运公司', trigger: 'change' }],
  logisticsNo: [{ required: true, message: '请输入快递单号', trigger: 'blur' }],
}
watch(model, async (newVal) => {
  if (newVal) {
    const res = await getLogisticsCompany()
    allCompany.value = res.data
  }
})
// 点击保存动作
const onSave = () => {
  return new Promise((resolve) => {
    logisticsForm?.value.validate(async (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        await deliveryOrder({ id })
        emits('on-success')
      } else {
        resolve(false)
      }
    })
  })
}
</script>
