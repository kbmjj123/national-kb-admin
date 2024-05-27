<template>
	<n-modal v-model:show="model"></n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const model = defineModel({
	type: Boolean,
	required: true
})
</script>
