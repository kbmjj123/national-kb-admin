<template>
  <n-card>
    我是dashboard页面
    <n-button @click="showMessage">对话框</n-button>
  </n-card>
</template>
<script setup lang="ts">
const message = useMessage()
const showMessage = () => {
  message.error('Once upon a time you dressed so fine')
}
</script>