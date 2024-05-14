<template>
  <n-upload v-bind="computedOptions" v-model="fileList" :render-icon="renderIcon" @before-upload="onBeforeUpload">
  </n-upload>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { UploadFileInfo, UploadSettledFileInfo } from 'naive-ui'

export type UploadOptions = {
  action?: string
  headers?: Record<string, string>
  data?: Record<string, string | number | object>
  listType?: string // 文件列表格式：text、image、image-card
  defaultUpload?: boolean // 是否选择时直接上传文件
  max?: number // 限制上传文件数量
  multiple?: boolean // 是否支持同时选中多个文件
  name?: string // 提交的文件字段，默认是files
  responseType?: string // 接口相应类型，默认是json
  showCancelButton?: boolean // 文件列表是否展示取消按钮
  showDownloadButton?: boolean // 是否显示下载按钮
  showRemoveButton?: boolean // 是否显示移除按钮
  showFileList?: boolean // 是否显示文件列表
  showPreviewButton?: boolean // 是否在文件列表显示预览按钮
}

const defaultOptions: UploadOptions = {
	action: '',
	headers: {},
	data: {},
	listType: 'image',
	defaultUpload: true,
	max: 9,
	multiple: true,
	name: 'files',
	showCancelButton: true,
	showDownloadButton: true,
	showRemoveButton: true,
	showFileList: true,
	showPreviewButton: true
}

const { options, fileList } = defineProps<{
  options: UploadOptions
  fileList: []
}>()

const computedOptions = computed(() => ({
  ...defaultOptions,
  ...options,
}))

// 文件图标渲染函数，仅在list-type=image/image-card有效
const renderIcon = (file: UploadSettledFileInfo) => {}

// 文件上传限制
const onBeforeUpload = ({file, fileList}: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
	if(file.file?.type === 'image/png'){
	}
}
</script>
