<template>
  <n-form>
    <n-form-item label="语言">{{ LANGUAGE_MAP[languageItem.key] }}</n-form-item>
    <n-form-item v-for="(item, index) in languageItem.languageMapList" :key="index" :label="item.label">
			<n-input v-if="'input' === item.type" :placeholder="'请输入' + item.label" v-model:value="item.value"></n-input>
      <n-input
        v-else-if="'textarea' === item.type"
        :placeholder="'请输入' + item.label"
        v-model:value="item.value"></n-input>
			<KEditor v-else-if="'richText' === item.type" v-model="item.value"></KEditor>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import type { LanguageItemType } from './types'
import { LANGUAGE_MAP } from './constants'
const { languageItem } = defineProps<{
  languageItem: LanguageItemType
}>()
</script>
