<template>
  <QuillEditor v-model="content" theme="snow" toolbar="full" ></QuillEditor>
</template>

<script lang="ts" setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { ref } from 'vue'

import ImageUploader from 'quill-image-uploader'
import 'quill-image-uploader/dist/quill.imageUploader.min.css'
import { manualUploadFile } from '@/api/system/resources'

import * as Emoji from 'quill-emoji'
import 'quill-emoji/dist/quill-emoji.css'
import { ResultEnum } from '@/enums/httpEnum'

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
  },
  {
    name: 'emoji',
    module: Emoji,
    options: {},
  },
])
</script>
