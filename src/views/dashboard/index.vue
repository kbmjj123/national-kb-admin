<template>
  <div>我是控制台首页</div>
</template>
<script setup lang="ts">
	import { useRouter } from 'vue-router'
	const router = useRouter()
	console.info(router)
</script>
