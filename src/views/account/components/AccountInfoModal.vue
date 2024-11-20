<template>
	<n-modal v-model:show="modelValue" preset="dialog" title="用户信息" negative-text="关闭">
		<n-spin :show="loading">
			<n-form v-if="result?.data">
				<n-form-item label="头像: ">
					<n-avatar
						round
						size="small"
						src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
					/>
				</n-form-item>
				<n-form-item label="账号: ">
					<n-text>{{ result.data.account }}</n-text>
				</n-form-item>
				<n-form-item label="邮箱: ">
					<n-text>{{ result.data.email }}</n-text>
				</n-form-item>
				<n-form-item label="创建时间: ">
					<n-text>{{ result.data.createTime }}</n-text>
				</n-form-item>
				<n-form-item label="最近登录时间: ">
					<n-text>{{ result.data.loginTime }}</n-text>
				</n-form-item>
				<n-form-item label="状态: ">
					<n-text>{{ result.data.state }}</n-text>
				</n-form-item>
			</n-form>
		</n-spin>
	</n-modal>
</template>

<script lang="ts" setup>
import { watchEffect } from 'vue';
import { getAccountInfo } from '@/api/account/account';
import { useLoading } from '@/hooks/web/useLoading';

const modelValue = defineModel({
	required: true,
	type: Boolean
})

const props = defineProps<{
	id: string
}>()

const { execute, result, loading } = useLoading(getAccountInfo)

watchEffect(() => {
	if(modelValue.value && execute){
		execute(props.id)
	}
})

</script>