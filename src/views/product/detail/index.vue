<template>
	<div>
		文件上传
		<Uploader :file-list="fileList" :options="{ uploadDragger: 'normal', listType: 'image-card' }"></Uploader>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const fileList = ref([])
</script>
