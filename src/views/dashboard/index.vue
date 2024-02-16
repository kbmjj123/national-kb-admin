<template>
  <n-card>
    我是dashboard页面
    <n-button v-copy="888888888" @click="showMessage">对话框</n-button>
  </n-card>
</template>
<script setup lang="ts">
const message = useMessage()
const showMessage = () => {
  message.error('Once upon a time you dressed so fine')
}
</script>