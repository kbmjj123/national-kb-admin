<template>
  <n-empty :description="description">
    <template #extra v-if="guide">
      <n-button size="small" type="primary" text @click="emit('on-guide')">
        新增分类
        <n-icon>
          <ArrowRightOutlined></ArrowRightOutlined>
        </n-icon>
      </n-button>
    </template>
  </n-empty>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRightOutlined } from '@vicons/antd'

const { description, guide } = withDefaults(defineProps<{
	description?: string,
	guide?: string
}>(), {
	description: '暂无数据'
})

const emit = defineEmits<{
	'on-guide': []
}>()

</script>
