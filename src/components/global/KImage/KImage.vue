<template>
  <n-image v-bind="attrs" :src="computedSrc" class="rounded-sm border cursor-pointer border-gray-50"></n-image>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useGlobSetting } from '@/hooks/setting'
const globalSetting = useGlobSetting()

const attrs = useAttrs()

const props = defineProps<{
  src: string
}>()

const computedSrc = computed(() => {
	if(props.src){
		if(props.src.indexOf('http') > -1){
			return props.src
		}else{
			return `${globalSetting.imgUrl}${props.src}`
		}
	}else{
		return ''
	}
})
</script>
