<template>
	<n-form ref="productForm" :label-width="100" label-placement="left" :rules="productRules" class="position">
		<KArea title="商品信息">
			<CategoryView :item-info="productInfo"></CategoryView>
			<BrandView></BrandView>
			<n-form-item label="商品名称: " path="name" ref="name">
				<n-input placeholder="请输入商品名称" clearable></n-input>
			</n-form-item>
			<SlugView :item-info="productInfo"></SlugView>
			<n-form-item label="商品价格: " path="price" ref="price">
				<n-flex align="center" :wrap="false" class="w-[100%]">
					<n-input placeholder="请输入商品价格" clearable class="w-[50%]">
						<template #suffix>
							元
						</template>
					</n-input>
					<n-checkbox class="w-40">面议<n-icon><ChevronForwardCircleOutline></ChevronForwardCircleOutline></n-icon></n-checkbox>
				</n-flex>
			</n-form-item>
			<n-form-item label="市场价: " path="activityPrice" ref=activityPrice>
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
			<n-form-item label="商品属性">
				<ProductParamsView :item-info="productInfo"></ProductParamsView>
			</n-form-item>
		<KArea title="图文详情">
			<KEditor></KEditor>
		</KArea>
	</n-form>
	<FixBottomArea>
		<n-button>返回</n-button>
		<n-button type="primary" @click="onSaveProductInfo">保存</n-button>
	</FixBottomArea>
</template>

<script lang="ts" setup>
import { ref, reactive, provide } from 'vue'
import { ProductType } from '@/api/product/product.ts'
import CategoryView from '../component/CategoryView.vue'
import BrandView from '../component/BrandView.vue'
import SlugView from '../component/SlugView.vue'
import ProductPictureView from '../component/ProductPictureView.vue'
import ProductParamsView from '../component/ProductParamsView.vue'
import {ChevronForwardCircleOutline} from '@vicons/ionicons5'

const productForm = ref()
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
// 缓存当前页面的表单校验规则
const productRules = {
	category: [{ required: true, message: '请选择分类', trigger: 'blur' }],
	name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
	slug: [{ required: true, message: '请输入slug', trigger: 'blur' }],
	price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
	descPic: [{ required: true, message: '请上传商品图片', trigger: 'blur' }]
}
// 对子组件提供的注册el动作，用于实现输入异常时，自动滚动到对应的位置
const itemRefsMap = reactive({})
const registerItemRef = (prop: string, el: HTMLElement) => {
	itemRefsMap[prop] = el
}
provide('registerItemRef', registerItemRef)
// 保存商品的动作
const onSaveProductInfo = () => {
	productForm.value?.validate((errors) => {
		console.info(errors)
		if(errors && errors.length > 0){
			const field = errors[0][0].field as string
			if(field){
				console.info(itemRefsMap[field])
				itemRefsMap[field].scrollIntoView({ behavior: 'smooth' })
			}
		}
	})
}

</script>
