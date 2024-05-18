<template>
	<CategoryView :item-info="productInfo"></CategoryView>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ProductType } from '@/api/product/product.ts'
import CategoryView from '../component/CategoryView.vue'

// 当前页面的商品信息对象
const productInfo = reactive<ProductType>({
	id: '',
	name: '',
	slug: '',
	category: '',
	masterPicture: '',
	descPic: [],
	detailContent: '',
	price: '',
	activityPrice: 0,
	remark: ''
})

</script>
