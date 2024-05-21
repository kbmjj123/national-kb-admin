<template>
	<div ref="areaContainer" class="h-[50px]"></div>
  <n-flex class="fixed bottom-0 bg-white p-2" justify="center" 
	:style="{ 'box-shadow': themeVars.boxShadow1, left: left + 'px', right: right + 'px' }">
    <slot></slot>
  </n-flex>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useThemeVars } from 'naive-ui'

const areaContainer = ref()
const left = ref(0)
const right = ref(0)

const getContainerWidth = () => {
	if(areaContainer.value){
		const screenWidth = window.innerWidth
		const rect = areaContainer.value.getBoundingClientRect()
		left.value = rect.left
		right.value = screenWidth - rect.right
		console.info(screenWidth - rect.right)
	}
}

onMounted(() => {
	getContainerWidth()
	window.addEventListener('resize', getContainerWidth)
})

const themeVars = useThemeVars()
</script>
