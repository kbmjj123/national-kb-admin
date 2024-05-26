<template>
  <n-modal v-model:show="model" title="物流轨迹">
    <iframe :src="kuaidiQueryLink" width="100%" height="100%"></iframe>
  </n-modal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const model = defineModel({
  required: true,
  type: Boolean,
})
const { id } = defineProps<{
  id: string
}>()

const kuaidiQueryLink = computed(
  () => `
		https://www.kuaidi100.com/chaxun?com=[${company}]&nu=[${logisticsNo}]
	`,
)
</script>
