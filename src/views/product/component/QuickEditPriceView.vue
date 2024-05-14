<template>
	<n-popover trigger="click">
		<span>{{ itemInfo.price }}</span>
		<template #trigger>
			<n-icon>
				<EditTwotone></EditTwotone>
			</n-icon>
		</template>
		<template>
			<n-form ref="priceForm" :model="itemInfo" :rules="priceRules" inline :label-width="90">
				<n-form-item label="价格：">
					<n-input v-model="itemInfo.price" placeholder="商品价格"></n-input>
				</n-form-item>
				<n-form-item :label-width="0" class="text-right">
					<n-button class="mr-1">取消</n-button>
					<n-button type="primary" @click="onFinishEditPrice"></n-button>
				</n-form-item>
			</n-form>
		</template>
	</n-popover>
</template>

<script setup lang="ts">
import { EditTwotone } from '@vicons/antd'
import { ProductType, publishOrEdit } from '@/api/product/product.ts'
import { ref, reactive } from 'vue';

const { itemInfo } = defineProps<{
	itemInfo: ProductType
}>()
const priceForm = ref()
const priceRules = {
	price: [{ required: true, message: '请输入商品价格!', trigger: ['input', 'blur'] }]
}
const loading = ref(false)
// 触发编辑商品价格动作
const onFinishEditPrice = () => {
	priceForm.value.validate(async val => {
		if(val){
			loading.value = true
			await publishOrEdit(itemInfo)
			loading.value = false
		}
	})
}
</script>
