<template>
	<n-flex>
		<n-flex>
			<n-button @click="onToggleLanguageView">{{ showLanguageFlag ? '收起' : '展开' }}</n-button>
			<n-button @click="onAddNewLang">新增语言</n-button>
		</n-flex>
		<n-flex v-if="showLanguageFlag">
			<LanguageItem v-for="(item, index) in languageList" :key="index" :language-item="item"></LanguageItem>
		</n-flex>
		<n-modal v-model:show="showAddLanguageFlag">

		</n-modal>
	</n-flex>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import LanguageItem from './LanguageItem.vue';
import type { LanguageItemType } from './types'

const { languageList } = defineProps<{
	languageList: Array<LanguageItemType>
}>()

const showLanguageFlag = ref(false)
const onToggleLanguageView = () => {
	showLanguageFlag.value = !showLanguageFlag.value
}

const showAddLanguageFlag = ref(false)

const emit = defineEmits<{
	'on-add-new-lang': []
}>()

/**
 * 添加新的语言
*/
const onAddNewLang = () => {

}
</script>
