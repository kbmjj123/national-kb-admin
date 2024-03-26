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
import { computed } from 'vue'
import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
import { renderIcon } from '@/utils'
import { ReloadOutlined, CloseOutlined, ColumnWidthOutlined, MinusOutlined } from '@vicons/antd'
import { useTabsViewStore } from '@/store/modules/tabsView'
const tabsViewStore = useTabsViewStore()
const { navMode, navTheme, headerSetting, menuSetting, multiTabsSetting } = useProjectSetting()

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
const tabsList: any = computed(() => tabsViewStore.tabsList)
const whiteList: string[] = [PageEnum.BASE_LOGIN_NAME, PageEnum.REDIRECT_NAME, PageEnum.ERROR_PAGE_NAME]
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
