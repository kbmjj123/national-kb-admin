<template>
	<n-form :label-width="100" label-placement="left">
		<KArea title="商品信息">
			<CategoryView :item-info="productInfo"></CategoryView>
			<BrandView></BrandView>
			<n-form-item label="商品名称: ">
				<n-input placeholder="请输入商品名称" clearable></n-input>
			</n-form-item>
			<SlugView :item-info="productInfo"></SlugView>
			<n-form-item label="商品价格: ">
				<n-flex align="center" :wrap="false" class="w-[100%]">
					<n-input placeholder="请输入商品价格" clearable class="w-[50%]">
						<template #suffix>
							元
						</template>
					</n-input>
					<n-checkbox class="w-40">面议<n-icon><ChevronForwardCircleOutline></ChevronForwardCircleOutline></n-icon></n-checkbox>
				</n-flex>
			</n-form-item>
			<n-form-item label="市场价: ">
				<n-input placeholder="请输入市场价">
					<template #suffix>
						元
					</template>
				</n-input>
			</n-form-item>
		</KArea>
		<KArea title="媒体信息">
			<ProductPictureView></ProductPictureView>
			<n-form-item label="商品视频: ">
				<Uploader v-model="productInfo.descPic" :options="{uploadDragger: 'single', listType: 'image'}"></Uploader>
			</n-form-item>
		</KArea>
		<KArea title="商品属性"></KArea>
			<ProductParamsView></ProductParamsView>
		<KArea title="图文详情">
			<KEditor></KEditor>
		</KArea>
	</n-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ProductType } from '@/api/product/product.ts'
import CategoryView from '../component/CategoryView.vue'
import BrandView from '../component/BrandView.vue'
import SlugView from '../component/SlugView.vue'
import ProductPictureView from '../component/ProductPictureView.vue'
import ProductParamsView from '../component/ProductParamsView.vue'
import {ChevronForwardCircleOutline} from '@vicons/ionicons5'

// 当前页面的商品信息对象
const productInfo = reactive<ProductType>({
	id: '',
	name: '',
	slug: '',
	category: '',
	masterPicture: '',
	descPic: [],
	params: [],
	detailContent: '',
	price: '',
	activityPrice: 0,
	remark: ''
})

</script>
