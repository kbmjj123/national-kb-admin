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
    @update:value="clickMenuItem"
    @update:expanded-keys="menuExpanded"></n-menu>
</template>

<script setup lang="ts">
import { computed, reactive, ref, unref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectSettingStore } from '@/store/modules/projectSetting'
import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
import { generatorMenu, generatorMenuMix } from '@/utils'

const collapsed = defineModel('collapsed', {
  type: Boolean,
})

const props = withDefaults(
  defineProps<{
    mode?: 'vertical' | 'horizontal' | undefined // 菜单模式
    location: string // 位置
  }>(),
  {
    mode: 'vertical',
    location: 'left',
  },
)

const currentRoute = useRoute()
const router = useRouter()
const settingStore = useProjectSettingStore()
// 定义待使用的菜单
const menus = ref<any[]>([])
// 当前选中的路由的名称
const selectedKeys = ref<string>(currentRoute.name as string)
const headerMenuSelectKey = ref<string>('')
// 当前导航模式
const { navMode } = useProjectSetting()
// 当前打开的子菜单
const matched = currentRoute.matched
const getOpenKeys = matched && matched.length ? matched.map((item) => item.name) : []
const state = reactive({
  openKeys: getOpenKeys,
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
const updateSelectedKeys = () => {
  const matched = currentRoute.matched
  state.openKeys = matched.map((item) => item.name)
  const activeMenu: string = (currentRoute.meta?.activeMenu as string) || ''
  selectedKeys.value = activeMenu ? (activeMenu as string) : (currentRoute.name as string)
}
const updateMenu = () => {
  // if (!settingStore.menuSetting.mixMenu) {
  //   menus.value = generatorMenu(asyncRouteStore.getMenus)
  // } else {
  //   //混合菜单
  //   const firstRouteName: string = (currentRoute.matched[0].name as string) || ''
  //   menus.value = generatorMenuMix(asyncRouteStore.getMenus, firstRouteName, props.location)
  //   const activeMenu: string = currentRoute?.matched[0].meta?.activeMenu as string
  //   headerMenuSelectKey.value = (activeMenu ? activeMenu : firstRouteName) || ''
  // }
  updateSelectedKeys()
}
const clickMenuItem = (key: string) => {
  if (/http(s)/?.test(key)) {
    window.open(key)
  } else {
    router.push({ name: key })
  }
}
//查找是否存在子路由
const findChildrenLen = (key: string) => {
  if (!key) return false
  const subRouteChildren: string[] = []
  for (const { children, key } of unref(menus)) {
    if (children && children.length) {
      subRouteChildren.push(key as string)
    }
  }
  return subRouteChildren.includes(key)
}
const menuExpanded = (openKeys: string[]) => {
  if (!openKeys) return
  const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1)
  const isExistChildren = findChildrenLen(latestOpenKey as string)
  state.openKeys = isExistChildren ? (latestOpenKey ? [latestOpenKey] : []) : openKeys
}
onMounted(() => {
  updateMenu()
})
watch(() => currentRoute.fullPath, updateMenu)
</script>
