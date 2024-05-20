<template>
  <n-modal v-model:show="model" preset="dialog" title="编辑商品属性" class="w-[80%]">
    <n-form label-placement="left" label-width="auto">
      <n-form-item label="分类属性: ">
        <n-flex vertical>
          <n-flex vertical v-for="(item, index) in categoryArray" :key="index">
            <n-text class="mt-1 flex items-center" type="primary"
              >{{ item.name }}<n-icon><ChevronDownCircleOutline /></n-icon
            ></n-text>
            <n-dynamic-tags v-model:value="item.params"></n-dynamic-tags>
          </n-flex>
        </n-flex>
      </n-form-item>
      <n-form-item label="所有属性: ">
        <n-flex class="mt-1">
          <n-tag
            v-for="(item, index) in tagList"
            :key="index"
            :type="item.cateId === categoryId ? 'default' : 'primary'"
            >{{ item.name }}</n-tag
          >
        </n-flex>
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { getCategoryParams, ParamType } from '@/api/product/category.ts'
import { ChevronDownCircleOutline } from '@vicons/ionicons5'

const model = defineModel({
  type: Boolean,
})
const { categoryId } = defineProps<{
  categoryId: string
}>()
const categoryArray = ref<Array<ParamType>>([])
const tagList = computed(() => {
  let tagList: { name: string; cateId: string }[] = []
  categoryArray.value.forEach((item: ParamType) => {
    item.params.forEach((cItem: string) => {
      tagList.push({
        cateId: item.id,
        name: cItem,
      })
    })
  })
  return tagList
})

// 获取分类信息
const getCategoryParamInfo = async () => {
  const res = await getCategoryParams({ categoryId })
  categoryArray.value = res.data
}

watch(model, (newVal) => {
  if (newVal) {
    getCategoryParamInfo()
  }
})
</script>
