<template>
	我是订单核销页面
</template>

<script>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute()

const { id } = route.params
//TODO id如果存在，则自动获取数据，借助于watchEffect

</script>
