<template>
	<div>
		文件上传
		<Uploader :file-list="fileList"></Uploader>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const fileList = ref([])
</script>
