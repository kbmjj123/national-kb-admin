<template>
  <quillEditor
    v-model="model"
    :options="editorOptions"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)"
    @change="onEditorChange($event)" />
</template>

<script setup lang="ts">
import { quillEditor } from 'vue3-quill'
import hljs from 'highlight.js'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

const model = defineModel({
	required: true,
	type: String
})
const editorOptions = {
  theme: 'snow', // 或者 'bubble'
  placeholder: 'core',
  modules: {
    syntax: { hljs },
  },
}
const onEditorBlur = (quill) => {
  console.log('editor blur!', quill)
}
const onEditorFocus = (quill) => {
  console.log('editor focus!', quill)
}
const onEditorReady = (quill) => {
  console.log('editor ready!', quill)
}
const onEditorChange = ({ quill, html, text }) => {
  console.log('editor change!', quill, html, text)
}
</script>
