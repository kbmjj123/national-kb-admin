<template>
	<!-- <n-loading-bar-provider :to="loadingBarTargetRef" container-style="position: absolute;"> -->
		<n-drawer
			ref="loadingBarTargetRef"
			:show="show"
			placement="right"
			resizable
			:native-scrollbar="false"
			:mask-closable="maskClosable"
			display-directive="if"
			:default-width="defaultWidth">
			<n-drawer-content :title="title">
				<slot></slot>
			</n-drawer-content>
		</n-drawer>
	<!-- </n-loading-bar-provider> -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const { title, maskClosable, show } = withDefaults(defineProps<{
	title: string,
	maskClosable?: boolean,
	show: boolean
}>(), {
	maskClosable: true
})

const defaultWidth = ref(251)
const loadingBarTargetRef = ref()

onMounted(() => {
	defaultWidth.value = window.innerWidth * 2 / 3
})
</script>
