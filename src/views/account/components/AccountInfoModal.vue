<template>
	<n-modal v-model:show="model" preset="dialog" title="用户信息" negative-text="关闭">
		<n-spin :show="!loading">
			<n-form v-if="result.data">
				<n-form-item></n-form-item>
			</n-form>
		</n-spin>
	</n-modal>
</template>

<script lang="ts" setup>
import { watchEffect } from 'vue';
import { getAccountInfo } from '@/api/account/account';
import { useLoading } from '@/hooks/web/useLoading';

const model = defineModel({
	required: true,
	type: Boolean
})

const props = defineProps<{
	id: string
}>()

const { execute, result, loading } = useLoading(getAccountInfo)

watchEffect(() => {
	if(model.value && execute){
		execute(props.id)
	}
})

</script>