<template>
	<span>{{ itemInfo.price }}</span>
	<n-popover trigger="click" ref="popover">
		<template #trigger>
			<n-icon class="cursor-pointer">
				<EditTwotone></EditTwotone>
			</n-icon>
		</template>
		<n-form ref="priceForm" :model="itemInfo" :rules="priceRules" label-placement="left"
		label-width="auto" inline>
				<n-form-item label="价格(¥)：" path="price">
					<n-input v-model:value="itemInfo.price" placeholder="商品价格"></n-input>
				</n-form-item>
				<n-form-item :label-width="0" class="text-right">
					<n-button type="primary" @click="onFinishEditPrice" :loading="loading">确定</n-button>
					<n-button class="ml-1" @click="onHidePopover">取消</n-button>
				</n-form-item>
			</n-form>
	</n-popover>
</template>

<script setup lang="ts">
import { EditTwotone } from '@vicons/antd'
import { ProductType, publishOrEdit } from '@/api/product/product.ts'
import { ref } from 'vue';
import { useMessage } from 'naive-ui'

const message = useMessage()
const { itemInfo } = defineProps<{
	itemInfo: ProductType
}>()
const priceForm = ref()
const popover = ref()
const priceRules = {
	price: [{ required: true, message: '请输入商品价格!', trigger: ['blur'] }]
}
const loading = ref(false)
// 触发编辑商品价格动作
const onFinishEditPrice = () => {
	priceForm?.value.validate(async errors => {
		if(!errors){
			loading.value = true
			const res = await publishOrEdit(itemInfo)
			message.success(res.message)
			loading.value = false
		}
	})
}
const onHidePopover = () => {
	popover?.value.setShow(false)
}
</script>
