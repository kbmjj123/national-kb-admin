<template>
  <n-modal v-model:show="model" title="物流轨迹">
    <iframe :src="kuaidiQueryLink" width="100%" height="100%"></iframe>
  </n-modal>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { browseOrderLogistics } from '@/api/order/order.ts'
const model = defineModel({
  required: true,
  type: Boolean,
})
const { id } = defineProps<{
  id: string
}>()
const company = ref('')
const logisticsNo = ref('')

watch(model, async (newVal) => {
	if(newVal && id) {
		const res = await browseOrderLogistics(id)
		company.value = res.data.company
		logisticsNo.value = res.data.logisticsNo
	}
})

const kuaidiQueryLink = computed(
  () => `
		https://www.kuaidi100.com/chaxun?com=[${company}]&nu=[${logisticsNo}]
	`,
)
</script>
