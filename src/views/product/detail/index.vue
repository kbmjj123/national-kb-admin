<template>
	<div>
		文件上传
		<Uploader 
		v-model="fileList" 
		:options="{ uploadDragger: 'normal', listType: 'image-card' }"></Uploader>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { UploadFileInfo } from 'naive-ui'
const fileList = ref<UploadFileInfo[]>([])

</script>
