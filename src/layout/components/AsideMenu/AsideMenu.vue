<template>
  <n-menu
    :options="menus"
    :inverted="inverted"
    :mode="mode"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="20"
    :indent="24"
    :expanded-keys="state.openKeys"
    :value="getSelectedKeys"
  ></n-menu>
</template>

<script setup lang="ts">
  import { computed, reactive, ref, unref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useProjectSettingStore } from '@/store/modules/projectSetting';
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
  

  const props = withDefaults(defineProps<{
    mode?: 'vertical' | 'horizontal' | undefined, // 菜单模式
    collapsed: boolean, // 侧边栏菜单是否收起
    location: string  // 位置
  }>(), {
    mode: 'vertical',
    location: 'left',
    collapsed: false
  })
  const currentRoute = useRoute()
  const router = useRouter()
  const settingStore = useProjectSettingStore()
  // 定义待使用的菜单
  const menus = ref<any[]>([])
  // 当前选中的路由的名称
  const selectedKeys = ref<string>(currentRoute.name as string)
    const headerMenuSelectKey = ref<string>('');
  // 当前导航模式
  const { navMode } = useProjectSetting()
  // 当前打开的子菜单
  const matched = currentRoute.matched
  const getOpenKeys = matched && matched.length ? matched.map((item) => item.name) : []
  const state = reactive({
    openKeys: getOpenKeys
  })
  const inverted = computed(() => {
    return ['dark', 'header-dark'].includes(settingStore.navTheme)
  })
  const getSelectedKeys = computed(() => {
    const location = props.location
    return 'left' === location || ('header' === location && unref(navMode) === 'horizontal')
      ? unref(selectedKeys)
      : unref(headerMenuSelectKey)
  })
</script>