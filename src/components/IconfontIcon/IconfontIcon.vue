<template>
  <svg :class="iconClass" aria-hidden="true">
    <use :xlink:href="iconHref"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
})

const iconHref = computed(() => `#icon-kb-${props.name}`)
const iconClass = computed(() => `icon ${props.className}`)
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
