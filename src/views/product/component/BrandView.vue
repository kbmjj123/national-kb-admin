<template>
	<n-form-item label="品牌: ">
		<n-select clearable placeholder="请选择品牌">
			<template #empty>
				<EmptyGuide @on-guide="onAddBrand"></EmptyGuide>
			</template>
		</n-select>
	</n-form-item>
</template>

<script setup lang="ts">

const onAddBrand = () => {
	
}

</script>