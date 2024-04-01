<template>
  <div
    class="box-border tabs-view"
    :class="{
      'tabs-view-fix': multiTabsSetting.fixed,
      'tabs-view-fixed-header': isMultiHeaderFixed,
      'tabs-view-default-background': getDarkTheme === false,
      'tabs-view-dark-background': getDarkTheme === true,
    }"
    :style="getChangeStyle">
    <div class="tabs-view-main">
      <div ref="navWrap" class="tabs-card" :class="{ 'tabs-card-scrollable': scrollable }">
        <span class="tabs-card-prev" :class="{ 'tabs-card-prev-hide': !scrollable }" @click="scrollPrev">
          <n-icon size="16" color="#515a6e">
            <LeftOutlined />
          </n-icon>
        </span>
        <span class="tabs-card-next" :class="{ 'tabs-card-next-hide': !scrollable }" @click="scrollNext">
          <n-icon size="16" color="#515a6e">
            <RightOutlined />
          </n-icon>
        </span>
        <div ref="navScroll" class="tabs-card-scroll">
          <Draggable :list="tabsList" animation="300" item-key="fullPath" class="flex">
            <template #item="{ element }">
              <div
                :id="`tag${element.fullPath.split('/').join('\/')}`"
                class="tabs-card-scroll-item"
                :class="{ 'active-item': activeKey === element.fullPath }"
                @click.stop="goPage(element)"
                @contextmenu="handleContextMenu($event, element)">
                <span>{{ element.meta.title }}</span>
                <n-icon size="14" @click.stop="closeTabItem(element)" v-if="!element.meta.affix">
                  <CloseOutlined />
                </n-icon>
              </div>
            </template>
          </Draggable>
        </div>
      </div>
      <div class="tabs-close">
        <n-dropdown trigger="hover" @select="closeHandleSelect" placement="bottom-end" :options="TabsMenuOptions">
          <div class="tabs-close-btn">
            <n-icon size="16" color="#515a6e">
              <DownOutlined />
            </n-icon>
          </div>
        </n-dropdown>
      </div>
      <n-dropdown
        :show="showDropdown"
        :x="dropdownX"
        :y="dropdownY"
        @clickoutside="onClickOutside"
        placement="bottom-start"
        @select="closeHandleSelect"
        :options="TabsMenuOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
import Draggable from 'vuedraggable'

import { renderIcon } from '@/utils'
import { ReloadOutlined, CloseOutlined, LeftOutlined, RightOutlined, ColumnWidthOutlined, MinusOutlined, DownOutlined } from '@vicons/antd'
import { useTabsViewStore, RouteItem } from '@/store/modules/tabsView'
import { PageEnum } from '@/enums/pageEnum'

import { useGo } from '@/hooks/web/usePage'
const go = useGo()

import { useMessage } from 'naive-ui'
const message = useMessage()

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

import { useDesignSetting } from '@/hooks/setting/useDesignSetting'
const { getDarkTheme, getAppTheme } = useDesignSetting()
import { useProjectSettingStore } from '@/store/modules/projectSetting';
const settingStore = useProjectSettingStore();

const tabsViewStore = useTabsViewStore()

const { navMode, headerSetting, menuSetting, multiTabsSetting, isMobile } = useProjectSetting()

const props = defineProps<{
	collapsed: boolean
}>()

const isMultiHeaderFixed = ref(false)
const activeKey = ref(route.fullPath)
const scrollable = ref(false)
const navScroll: any = ref(null)
const isCurrent = ref(false)
const showDropdown = ref(false)
const dropdownX = ref(0)
const dropdownY = ref(0)


const isMixMenuNoneSub = computed(() => {
	const mixMenu = settingStore.menuSetting.mixMenu;
  const currentRoute = useRoute();
  if (navMode.value != 'horizontal-mix') return true;
  return !(navMode.value === 'horizontal-mix' && mixMenu && currentRoute.meta.isRoot);
});

import { useThemeVars } from 'naive-ui';
const themeVars = useThemeVars();
const getCardColor = computed(() => {
  return themeVars.value.cardColor;
});

const getBaseColor = computed(() => {
  return themeVars.value.textColor1;
});

//动态组装样式 菜单缩进
const getChangeStyle = computed(() => {
  const { collapsed } = props
  const { minMenuWidth, menuWidth }: any = menuSetting.value
  const { fixed }: any = multiTabsSetting.value
  let lenNum =
    navMode.value === 'horizontal' || !isMixMenuNoneSub.value
      ? '0px'
      : collapsed
        ? `${minMenuWidth}px`
        : `${menuWidth}px`

  if (isMobile.value) {
    return {
      left: '0px',
      width: '100%',
    }
  }
  return {
    left: lenNum,
    width: `calc(100% - ${!fixed ? '0px' : lenNum})`,
  }
})

//tags 右侧下拉菜单
const TabsMenuOptions = computed(() => {
  const isDisabled = tabsList.value.length <= 1
  return [
    {
      label: '刷新当前',
      key: '1',
      icon: renderIcon(ReloadOutlined),
    },
    {
      label: `关闭当前`,
      key: '2',
      disabled: isCurrent.value || isDisabled,
      icon: renderIcon(CloseOutlined),
    },
    {
      label: '关闭其他',
      key: '3',
      disabled: isDisabled,
      icon: renderIcon(ColumnWidthOutlined),
    },
    {
      label: '关闭全部',
      key: '4',
      disabled: isDisabled,
      icon: renderIcon(MinusOutlined),
    },
  ]
})
// 标签页列表
const tabsList = computed(() => tabsViewStore.tabsList)
const whiteList: string[] = [PageEnum.BASE_LOGIN_NAME, PageEnum.REDIRECT_NAME, PageEnum.ERROR_PAGE_NAME]

// 获取简易的路由对象
const getSimpleRoute = (route): RouteItem => {
	const { fullPath, hash, meta, name, params, path, query } = route
	return { fullPath, hash, meta, name, params, path, query }
}

// 是否开启自滚动功能
const updateNavScroll = async (autoScroll?: boolean) => {
	await nextTick()
	if(!navScroll.value) return
	const containerWidth = navScroll.value.offsetWidth
	const navWidth = navScroll.value.scrollWidth
	if(containerWidth < navWidth) {
		scrollable.value = true
		if(autoScroll) {
			let tagList = navScroll.value.querySelectorAll('.tabs-card-scroll-item') || []
			tagList.forEach((tag: HTMLElement) => {
        // fix SyntaxError
        if (tag.id === `tag${activeKey.value.split('/').join('\/')}`) {
          tag.scrollIntoView && tag.scrollIntoView();
        }
      });
		}else{
			scrollable.value = false
		}
	}
}

watch(() => route.fullPath, (to: string) => {
	if(whiteList.includes(route.name as string)) return
	activeKey.value = to
	tabsViewStore.addTab(getSimpleRoute(route))
	updateNavScroll(true)
}, { immediate: true })

// 点击触发页面跳转
const goPage = (element) => {
	const { fullPath } = element
	if(fullPath === route.fullPath) return
	//? 这里以replace的方式来进行的跳转
	go(element, true)
}
const handleContextMenu = (e: MouseEvent, item: RouteItem) => {
	e.preventDefault()
	isCurrent.value = PageEnum.BASE_HOME_REDIRECT === item.path
	showDropdown.value = false
	nextTick().then(() => {
		showDropdown.value = true
		dropdownX.value = e.clientX
		dropdownY.value = e.clientY
	})
}
const closeTabItem = (element: RouteItem) => {
	const { fullPath } = element
	const routeInfo = tabsList.value.find(item => (item.fullPath === fullPath))
	routeInfo && removeTab(routeInfo)
}
// 关闭页面
const removeTab = (route) => {
	if(1 === tabsList.value.length){
		return message.warning('这已经是最后一页了，不能再关闭了！')
	}
	delKeepAliveCompName()
	tabsViewStore.closeCurrentTab(route)
	updateNavScroll()
}

// 移除缓存组件名称
const delKeepAliveCompName = () => {
	if(route.meta.keepAlive){
	}
}
// 点击外部区域隐藏下拉菜单
const onClickOutside = () => {
	showDropdown.value = false
}

// 重新加载页面
const reloadPage = () => {
	delKeepAliveCompName()
	router.push({
		path: `/redirect${route.fullPath}`
	})
}

// 关闭其他
const closeOther = (route: RouteItem) => {
	tabsViewStore.closeOtherTabs(route)
	activeKey.value = route.fullPath
	router.replace(route.fullPath)
	updateNavScroll()
}

// 关闭全部
const closeAll = () => {
	tabsViewStore.closeAllTabs()
	router.replace(PageEnum.BASE_HOME)
	updateNavScroll()
}

// tab的相关操作
const closeHandleSelect = (key: '1' | '2' | '3' | '4') => {
	switch(key){
		case '1':
			// 刷新
			reloadPage()
			break
		case '2':
			// 关闭
			removeTab(route)
			break
		case '3':
			// 关闭其他
			closeOther(route as RouteItem)
			break
		case '4':
			// 关闭所有
			closeAll()
			break
	}
	updateNavScroll()
	showDropdown.value = false
}

const scrollPrev = () => {
	const containerWidth = navScroll.value.offsetWidth;
	const currentScroll = navScroll.value.scrollLeft;

  if (!currentScroll) return;
  const scrollLeft = currentScroll > containerWidth ? currentScroll - containerWidth : 0;
  scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20); 
}

const scrollNext = () => {
	const containerWidth = navScroll.value.offsetWidth;
  const navWidth = navScroll.value.scrollWidth;
  const currentScroll = navScroll.value.scrollLeft;

  if (navWidth - currentScroll <= containerWidth) return;
  const scrollLeft =
    navWidth - currentScroll > containerWidth * 2
      ? currentScroll + containerWidth
      : navWidth - containerWidth;
  scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
}

//! 监听滚动条
const onScroll = (e) => {
	let scrollTop = e.target.scrollTop || document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
	isMultiHeaderFixed.value = !!(!headerSetting.value.fixed && multiTabsSetting.value.fixed && scrollTop >= 64)
}
window.addEventListener('scroll', onScroll, true)

</script>

<style lang="less" scoped>
.tabs-view {
  width: 100%;
  padding: 6px 0;
  display: flex;
  transition: all 0.2s ease-in-out;

  &-main {
    height: 32px;
    display: flex;
    max-width: 100%;
    min-width: 100%;

    .tabs-card {
      -webkit-box-flex: 1;
      flex-grow: 1;
      flex-shrink: 1;
      overflow: hidden;
      position: relative;

      .tabs-card-prev,
      .tabs-card-next {
        width: 32px;
        text-align: center;
        position: absolute;
        line-height: 32px;
        cursor: pointer;

        .n-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          width: 32px;
        }
      }

      .tabs-card-prev {
        left: 0;
      }

      .tabs-card-next {
        right: 0;
      }

      .tabs-card-next-hide,
      .tabs-card-prev-hide {
        display: none;
      }

      &-scroll {
        white-space: nowrap;
        overflow: hidden;

        &-item {
          background: v-bind(getCardColor);
          color: v-bind(getBaseColor);
          height: 32px;
          padding: 6px 16px 4px;
          border-radius: 3px;
          margin-right: 6px;
          cursor: pointer;
          display: inline-block;
          position: relative;
          flex: 0 0 auto;

          span {
            float: left;
            vertical-align: middle;
          }

          &:hover {
            color: #515a6e;
          }

          .n-icon {
            height: 22px;
            width: 21px;
            margin-right: -6px;
            position: relative;
            vertical-align: middle;
            text-align: center;
            color: #808695;

            &:hover {
              color: #515a6e !important;
            }

            svg {
              height: 21px;
              display: inline-block;
            }
          }
        }

        .active-item {
          color: v-bind(getAppTheme);
        }
      }
    }

    .tabs-card-scrollable {
      padding: 0 32px;
      overflow: hidden;
    }
  }

  .tabs-close {
    min-width: 32px;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: var(--color);
    border-radius: 2px;
    cursor: pointer;

    &-btn {
      color: var(--color);
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.tabs-view-default-background {
  background: #f5f7f9;
}

.tabs-view-dark-background {
  background: #101014;
}

.tabs-view-fix {
  position: fixed;
  z-index: 5;
  padding: 6px 10px 6px 10px;
  left: 200px;
}

.tabs-view-fixed-header {
  top: 0;
}
</style>
