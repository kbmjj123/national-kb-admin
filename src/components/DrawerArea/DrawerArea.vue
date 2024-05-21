<template>
  <n-drawer
    v-model:show="model"
    placement="right"
    resizable
		:native-scrollbar="false"
    :mask-closable="maskClosable"
    :display-directive="displayDirective"
    :default-width="defaultWidth">
    <n-drawer-content :title="title">
      <slot></slot>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const { title, displayDirective, maskClosable } = withDefaults(defineProps<{
	title: string,
	displayDirective?: string,	//if/show
	maskClosable?: boolean
}>(), {
	displayDirective: 'if',
	maskClosable: true
})
const model = defineModel({
	type: Boolean,
	required: true
})
const defaultWidth = ref(251)

onMounted(() => {
	defaultWidth.value = window.innerWidth * 2 / 3
})
</script>
