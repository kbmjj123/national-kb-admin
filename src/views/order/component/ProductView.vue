<template>
	<n-flex>
		<n-image></n-image>
		<n-popover>
			<template #trigger>
				<n-icon>
					<MoreOutlined></MoreOutlined>
				</n-icon>
			</template>
			<!-- 商品数据 -->
			<n-data-table></n-data-table>
		</n-popover>
	</n-flex>
</template>

<script>
import { ref } from 'vue';
import { MoreOutlined } from '@vicons/antd'

</script>
