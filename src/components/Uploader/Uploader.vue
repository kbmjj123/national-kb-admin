<template>
  <n-upload 
		:action="computedOptions.action"
		:headers="computedOptions.headers"
		:listType="computedOptions.listType"
		:defaultUpload="computedOptions.defaultUpload"
		:max="computedOptions.max"
		:name="computedOptions.name"
		:responseType="computedOptions.responseType"
		:method="computedOptions.method"
		:showCancelButton="computedOptions.showCancelButton"
		:showDownloadButton="computedOptions.showDownloadButton"
		:showRemoveButton="computedOptions.showRemoveButton"
		:showFileList="computedOptions.showFileList"
		:showPreviewButton="computedOptions.showPreviewButton"
		@download="onDownload"
		@change="onChange"
		:file-list="fileList"
		>
    <n-upload-dragger v-if="'single' === computedOptions.uploadDragger">
      <div class="mb-3">
        <n-icon size="48" :depth="3">
          <ArchiveOutline></ArchiveOutline>
        </n-icon>
      </div>
      <n-text class="text-xs">点击或者拖动文件到该区域来上传</n-text>
    </n-upload-dragger>
    <n-upload-dragger v-else-if="'normal' === computedOptions.uploadDragger">
			文件上传
		</n-upload-dragger>
    <n-upload-dragger v-else>
      <slot></slot>
    </n-upload-dragger>
  </n-upload>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { UploadFileInfo, UploadSettledFileInfo } from 'naive-ui'
import { ArchiveOutline } from '@vicons/ionicons5'

export type UploadOptions = {
  action?: string
  headers?: Record<string, string>
	method?: string
  data?: Record<string, string | number | object>
  listType?: 'text' | 'image' | 'image-card' // 文件列表格式：text、image、image-card，默认是image-card
  defaultUpload?: boolean // 是否选择时直接上传文件
  max?: number // 限制上传文件数量，默认最多时9个
  multiple?: boolean // 是否支持同时选中多个文件
  name?: string // 提交的文件字段，默认是files
  responseType?: XMLHttpRequestResponseType // 接口相应类型，默认是json
  showCancelButton?: boolean // 文件列表是否展示取消按钮
  showDownloadButton?: boolean // 是否显示下载按钮
  showRemoveButton?: boolean // 是否显示移除按钮
  showFileList?: boolean // 是否显示文件列表
  showPreviewButton?: boolean // 是否在文件列表显示预览按钮
  uploadDragger?: string // 上传拖动器的样式：single、normal、custom，默认是normal
	[index: string]: any
}

const defaultOptions: UploadOptions = {
  action: 'http://localhost:8001/api/file/upload',
  headers: {},
  data: {},
	method: 'put',
  listType: 'image-card',
  defaultUpload: true,
  max: 9,
  multiple: true,
  name: 'files',
  showCancelButton: true,
  showDownloadButton: true,
  showRemoveButton: true,
  showFileList: true,
  showPreviewButton: true,
  uploadDragger: 'single',
}

let { options, fileList } = defineProps<{
  options?: UploadOptions
  fileList: UploadFileInfo[]
}>()

const computedOptions = computed(() => ({
  ...defaultOptions,
  ...options,
}))

const emit = defineEmits<{
	'on-upload': [filieList: []]
}>()

// 文件下载动作
const onDownload = (file: UploadFileInfo) => {
	alert(`${file.name}`)
}
// 上传了文件动作
const onChange = (data: { fileList: UploadFileInfo[] }) => {
	// emit('on-upload', data.fileList)
	// computedFileList.value = data.fileList
} 
// 文件图标渲染函数，仅在list-type=image/image-card有效
// const renderIcon = (file: UploadSettledFileInfo) => {}

</script>
