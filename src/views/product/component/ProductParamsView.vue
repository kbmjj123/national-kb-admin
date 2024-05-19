<template>
	<n-form-item label="商品属性: ">
		<n-input-group class="gap-3 items-center">
			<n-input placeholder="属性名称" class="w-[100px]"></n-input>
			<n-dynamic-tags :min="1" placeholder="属性值"></n-dynamic-tags>
			<n-button text type="primary" @click="onAddNewParamsItem">新增</n-button>
			<n-button text type="error" @click="onDeleteParamsItem">删除</n-button>
		</n-input-group>
	</n-form-item>
</template>

<script setup lang="ts">

const onAddNewParamsItem = () => {}
const onDeleteParamsItem = () => {}
</script>