<template>
  <n-data-table :columns="columns" :data="data" :pagination="pagination" :bordered="false" />
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { NButton, useMessage } from 'naive-ui'
const message = useMessage()
const columns = ref([
  {
    title: 'No',
    key: 'no',
  },
  {
    title: 'Title',
    key: 'title',
  },
  {
    title: 'Length',
    key: 'length',
  },
  {
    title: 'Action',
    key: 'actions',
    render: (row) =>
      h(
        NButton,
        {
          strong: true,
          tertiary: true,
          size: 'small',
          onClick: () => play(row),
        },
        { default: () => 'Play' },
      ),
  },
])
const play = (row) => {
	message.info(`Play ${row.title}`)
}
const data = ref([
  { no: 3, title: 'Wonderwall', length: '4:18' },
  { no: 4, title: "Don't Look Back in Anger", length: '4:48' },
  { no: 12, title: 'Champagne Supernova', length: '7:27' }
])
const pagination = ref(true)
</script>
