<template>
	<n-form ref="productForm" :model="productInfo" :label-width="100" label-placement="left" :rules="productRules" class="position">
		<KArea title="商品信息">
			<CategoryView :item-info="productInfo"></CategoryView>
			<n-form-item label="商品属性">
				<ProductParamsView :item-info="productInfo"></ProductParamsView>
			</n-form-item>
			<BrandView></BrandView>
			<n-form-item label="商品名称" path="productName" ref="productName">
				<n-input placeholder="请输入商品名称" class="w-[50%]" clearable v-model:value="productInfo.productName"></n-input>
			</n-form-item>
			<SlugView :item-info="productInfo"></SlugView>
			<n-form-item label="商品价格" path="price" ref="price">
				<n-flex align="center" :wrap="false" class="w-[100%]">
					<n-input placeholder="请输入商品价格" clearable class="w-[50%]" v-model:value="productInfo.price">
						<template #suffix>
							元
						</template>
					</n-input>
					<n-checkbox class="w-40">面议<n-icon><ChevronForwardCircleOutline></ChevronForwardCircleOutline></n-icon></n-checkbox>
				</n-flex>
			</n-form-item>
			<n-form-item label="市场价" path="marketPrice" ref=marketPrice>
				<n-input placeholder="请输入市场价" class="w-[50%]" v-model:value="productInfo.marketPrice">
					<template #suffix>
						元
					</template>
				</n-input>
			</n-form-item>
		</KArea>
		<KArea title="媒体信息">
			<ProductPictureView :item-info="productInfo"></ProductPictureView>
			<n-form-item label="商品视频">
				<Uploader v-model="productInfo.descPic" :options="{uploadDragger: 'single', listType: 'image'}"></Uploader>
			</n-form-item>
		</KArea>
		<KArea title="图文详情">
			<KEditor v-model:value="productInfo.detailContent"></KEditor>
		</KArea>
	</n-form>
	<FixBottomArea>
		<n-button>返回</n-button>
		<n-button type="primary" :loading="loading" @click="onSaveProductInfo">保存</n-button>
	</FixBottomArea>
</template>

<script lang="ts" setup>
import { ref, reactive, provide, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ProductType, getProductInfo, publishOrEdit } from '@/api/product/product.ts'
import CategoryView from '../component/CategoryView.vue'
import BrandView from '../component/BrandView.vue'
import SlugView from '../component/SlugView.vue'
import ProductPictureView from '../component/ProductPictureView.vue'
import ProductParamsView from '../component/ProductParamsView.vue'
import {ChevronForwardCircleOutline} from '@vicons/ionicons5'
import { useLoading } from '@/hooks/web/useLoading.ts'
import KEditor from '@/components/KEditor'

const route = useRoute()
const router = useRouter()
const productForm = ref()
const INIT_PRODUCT = {
	id: '',
	productName: '',
	slug: '',
	slugTarget: 'pro-',
	cates: [],
	masterPicture: '',
	descPic: ['','','','',''],
	paramsList: [],
	detailContent: '',
	price: '',
	marketPrice: '',
	remark: ''
}
// 当前页面的商品信息对象
const productInfo = reactive<ProductType>(INIT_PRODUCT)

// 缓存当前页面的表单校验规则
const productRules = {
	cates: [{ required: true, message: '请选择分类', trigger: 'blur' }],
	productName: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
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

const productName = ref()
const price = ref()
const descPic = ref()
onMounted(() => {
	registerItemRef('productName', productName.value?.$el)
	registerItemRef('price', price.value?.$el)
	registerItemRef('descPic', descPic.value?.$el)
	getProductInfoAction()
})
// 获取商品信息
const getProductInfoAction = async () => {
	if(route.params.id){
		const res = await getProductInfo(route.params.id as string)
		Object.assign(productInfo, res.data)
	}
}
const { loading, execute } = useLoading(publishOrEdit)
// 保存商品的动作
const onSaveProductInfo = () => {
	productForm.value?.validate((errors) => {
		if(errors && errors.length > 0){
			// 存在异常，则滚动至有异常的位置
			const field = errors[0][0].field as string
			if(field){
				itemRefsMap[field].scrollIntoView({ behavior: 'smooth' })
			}
		}else{
			execute && execute(productInfo, null, () => {
				//? 操作成功
				router.back()
			})
		}
	})
}

</script>
