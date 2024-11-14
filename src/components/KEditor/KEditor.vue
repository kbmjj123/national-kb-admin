<template>
  <quill-editor
    v-model:value="content"
  />
</template>

<script lang="ts" setup>
import { quillEditor, Quill } from 'vue3-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { ref } from 'vue'

import ImageUploader from 'quill-image-uploader'
import 'quill-image-uploader/dist/quill.imageUploader.min.css'
Quill.register("modules/imageUploader", ImageUploader)

import { manualUploadFile } from '@/api/system/resources'
import { ResultEnum } from '@/enums/httpEnum'

import * as Emoji from 'quill-emoji'
import 'quill-emoji/dist/quill-emoji.css'

const content = ref('')
const modules = ref([
  {
    name: 'imageUploader',
    module: ImageUploader,
    options: {
      upload: async (file: File) => {
        const res = await manualUploadFile('images', file)
        if (res.status === ResultEnum.SUCCESS) {
          return res.data
        } else {
          return '上传失败'
        }
      },
    },
  }
])
</script>
