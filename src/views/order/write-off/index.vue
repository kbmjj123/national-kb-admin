<template>
	<n-layout>
		<n-layout-content>
			<n-form ref="queryFormRef" :model="queryForm" :show-label="false">
				<n-form-item path="key">
					<n-input-group>
						<n-input placeholder="请输入会员码或核销码或订单号"></n-input>
						<n-button type="primary" @click="queryAction" :loading="loading">
							<template #icon>
								<n-icon>
									<Search></Search>
								</n-icon>
							</template>
							搜索
						</n-button>
					</n-input-group>
				</n-form-item>
			</n-form>
			<n-data-table bordered :single-column="false" :loading="loading" :data="" :columns=""></n-data-table>
		</n-layout-content>
	</n-layout>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { Search } from '@vicons/ionicons5'
import { useLoading } from '@/hooks/web/useLoading.ts'
import { getWaitToWriteOffOrderList } from '@/api/order/order.ts'

const route = useRoute()
const queryForm = reactive({
	key: route.params?.id || ''
})
const queryRules = {
	key: [{ required: true, trigger: 'blur', message: '请输入会员码或核销码或订单号' }]
}
const queryFormRef = ref()
const { loading, execute, result } = useLoading(getWaitToWriteOffOrderList)
const id = route.params?.id

onMounted(() => {
	id && execute(id)
})

const queryAction = () => {
	queryFormRef.value?.validate(errors => {
		if(!errors || 0 === errors.length){
			execute(queryForm.key)
		}
	})
}

</script>
