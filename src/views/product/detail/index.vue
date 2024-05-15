<template>
	<div>
		文件上传
		<Uploader 
		:file-list="fileList" 
		@on-upload="onUpload"
		:options="{ uploadDragger: 'normal', listType: 'image-card' }"></Uploader>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const fileList = ref([])
const onUpload = (list: []) => {
	// fileList.value = list
}
</script>
