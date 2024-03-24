<template>
  <n-layout has-sider class="layout" :position="fixedMenu">
    <!-- 左侧顶部的图标与菜单列表 -->
    <n-layout-sider
      show-trigger="bar"
      :position="fixedMenu"
      :collapsed="collapsed"
      collapse-mode="width"
      :collapsed-width="64"
      :width="leftMenuWidth"
      :native-scrollbar="false"
      :inverted="inverted"
      class="layout-sider"
      @collapse="collapsed = true"
      @expand="collapsed = false">
      <!-- 系统图标logo -->
      <Logo :collapsed="collapsed" />
      <!-- 映射的菜单 -->
      <AsideMenu v-model:collapsed="collapsed" location="left" />
    </n-layout-sider>
    <!-- 右侧容器 -->
    <n-layout :inverted="inverted">
      <!-- 头部视图组件 -->
      <n-layout-header :inverted="getHeaderInverted" >
				<PageHeader :collapsed="collapsed" :inverted="getHeaderInverted"/>
			</n-layout-header>
      <!-- 各个页面所在的layout组件 -->
      <n-layout-content class="layout-content">
        <MainView />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
<script setup lang="ts">
import { ref, computed, unref } from 'vue'
import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
import { Logo } from './components/Logo'
import { AsideMenu } from './components/AsideMenu'
import { MainView } from './components/MainView'
import { PageHeader } from './components/PageHeader'

const { navMode, navTheme, headerSetting, menuSetting, multiTabsSetting } = useProjectSetting()

const collapsed = ref<boolean>(false)

const fixedMenu = computed(() => {
  const { fixed } = unref(headerSetting)
  return fixed ? 'absolute' : 'static'
})

const inverted = computed(() => {
  return ['dark', 'header-dark'].includes(unref(navTheme))
})
const getHeaderInverted = computed(() => {
  return ['light', 'header-dark'].includes(unref(navTheme)) ? unref(inverted) : !unref(inverted)
})
//? 根据菜单的展开与否，设置当前菜单的长度
const leftMenuWidth = computed(() => {
  const { minMenuWidth, menuWidth } = unref(menuSetting)
  return collapsed.value ? minMenuWidth : menuWidth
})
</script>

<style lang="less">
.layout-side-drawer {
  background-color: rgb(0, 20, 40);

  .layout-sider {
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
  }
}
</style>
<style lang="less" scoped>
.layout {
  display: flex;
  flex-direction: row;
  flex: auto;

  &-default-background {
    background: #f5f7f9;
  }

  .layout-sider {
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
  }

  .layout-sider-fix {
    position: fixed;
    top: 0;
    left: 0;
  }

  .ant-layout {
    overflow: hidden;
  }

  .layout-right-fix {
    overflow-x: hidden;
    padding-left: 200px;
    min-height: 100vh;
    transition: all 0.2s ease-in-out;
  }

  .layout-content {
    flex: auto;
    min-height: 100vh;
  }

  .n-layout-header.n-layout-header--absolute-positioned {
    z-index: 11;
  }

  .n-layout-footer {
    background: none;
  }
}

.layout-content-main {
  margin: 0 10px 10px;
  position: relative;
  padding-top: 64px;
}

.layout-content-main-fix {
  padding-top: 64px;
}

.fluid-header {
  padding-top: 0;
}

.main-view-fix {
  padding-top: 44px;
}

.noMultiTabs {
  padding-top: 0;
}
</style>
