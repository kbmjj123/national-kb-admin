<template>
  <!-- 全局调用的准备工作 -->
  <n-loading-bar-provider>
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <n-config-provider :theme="theme">
            <slot></slot>
            <n-global-style />
          </n-config-provider>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { darkTheme } from 'naive-ui'
const theme = ref()
const currentTime = ref(new Date().toLocaleDateString())
let timer
watch(currentTime, () => {
  const hour = new Date().getHours()
  if (hour >= 6 && hour <= 18) {
    theme.value = null
  } else {
    theme.value = darkTheme
  }
})
onMounted(() => {
  timer = setInterval(
    () => {
      currentTime.value = new Date().toLocaleDateString()
    },
    24 * 60 * 1000,
  )
})
onBeforeUnmount(() => {
  timer && clearInterval(timer)
})
</script>
