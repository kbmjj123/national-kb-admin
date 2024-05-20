<template>
	<n-modal v-model:show="model" preset="card" title="编辑商品属性">
		<n-form>
			<n-form-item></n-form-item>
		</n-form>
	</n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const model = defineModel()

</script>
