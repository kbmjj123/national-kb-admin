<template>
  <div class="layout-header">
    <!--手机模式下的顶部菜单-->
    <div class="layout-header-left" v-if="navMode === 'horizontal'">
      <div class="logo" v-if="navMode === 'horizontal'">
        <img :src="websiteConfig.logo" alt="" />
        <h2 v-show="!collapsed" class="title">{{ websiteConfig.title }}</h2>
      </div>
      <AsideMenu
        :inverted="getInverted"
				location="left"
        mode="horizontal" />
    </div>
    <!--左侧菜单-->
    <div class="layout-header-left" v-else>
      <!-- 菜单收起 -->
      <div
        class="ml-1 layout-header-trigger layout-header-trigger-min"
        @click="() => $emit('update:collapsed', !collapsed)">
        <n-icon size="18" v-if="collapsed">
          <MenuUnfoldOutlined />
        </n-icon>
        <n-icon size="18" v-else>
          <MenuFoldOutlined />
        </n-icon>
      </div>
      <!-- 刷新 -->
      <div
        class="mr-1 layout-header-trigger layout-header-trigger-min"
        v-if="headerSetting.isReload"
        @click="reloadPage">
        <n-icon size="18">
          <ReloadOutlined />
        </n-icon>
      </div>
      <!-- 面包屑 -->
      <n-breadcrumb v-if="crumbsSetting.show">
        <!-- <template v-for="routeItem in breadcrumbList" :key="routeItem.name === 'Redirect' ? void 0 : routeItem.name">
          <n-breadcrumb-item v-if="routeItem.meta.title">
            <n-dropdown v-if="routeItem.children.length" :options="routeItem.children" @select="dropdownSelect">
              <span class="link-text">
                <component v-if="crumbsSetting.showIcon && routeItem.meta.icon" :is="routeItem.meta.icon" />
                {{ routeItem.meta.title }}
              </span>
            </n-dropdown>
            <span class="link-text" v-else>
              <component v-if="crumbsSetting.showIcon && routeItem.meta.icon" :is="routeItem.meta.icon" />
              {{ routeItem.meta.title }}
            </span>
          </n-breadcrumb-item>
        </template> -->
      </n-breadcrumb>
    </div>
		<!-- 右侧菜单 -->
    <div class="layout-header-right">
			<!-- 循环遍历图标列表 -->
      <div class="layout-header-trigger layout-header-trigger-min" v-for="item in iconList" :key="item.tips">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <component :is="item.icon" v-on="item.eventObject || {}" />
            </n-icon>
          </template>
          <span>{{ item.tips }}</span>
        </n-tooltip>
      </div>
      <!--切换全屏-->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="18">
              <component :is="fullscreenIcon" @click="toggleFullScreen" />
            </n-icon>
          </template>
          <span>全屏</span>
        </n-tooltip>
      </div>
      <!-- 个人中心 -->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-dropdown trigger="hover" @select="avatarSelect" :options="avatarOptions">
          <div class="avatar">
            <n-avatar round>
              {{ username }}
              <template #icon>
                <UserOutlined />
              </template>
            </n-avatar>
          </div>
        </n-dropdown>
      </div>
      <!--设置-->
      <div class="layout-header-trigger layout-header-trigger-min" @click="openSetting">
        <n-tooltip placement="bottom-end">
          <template #trigger>
            <n-icon size="18" style="font-weight: bold">
              <SettingOutlined />
            </n-icon>
          </template>
          <span>项目配置</span>
        </n-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AsideMenu } from '../AsideMenu'
import { ref, reactive, toRefs, computed, unref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUser } from '@/store/modules/user' 
import websiteConfig from '@/config/websiteConfig'
import { useDialog } from 'naive-ui'
import {
  SettingOutlined,
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  PoweroffOutlined,
  GithubOutlined,
  LockOutlined,
  ReloadOutlined,
  LogoutOutlined,
  UserOutlined,
  CheckOutlined,
} from '@vicons/antd'

const router = useRouter()
const dialog = useDialog()

const props = defineProps<{
  // collapsed: boolean
  inverted: boolean
}>()

const collapsed = defineModel('collapsed', {
	type: Boolean,
	default: false
})

//***** 刷新的相关属性与操作 *****
const headerSetting = reactive({
	isReload: true
})
const reloadPage = () => {
	window.location.reload()
}

//***** 面包屑的相关属性与操作 *****
const crumbsSetting = reactive({
	show: true,
	showIcon: true
})
const breadcrumbList = reactive([
	{
		
	}
])
// 选中了面包屑
const dropdownSelect = () => {}

//***** 当前的屏幕模式 *****
import { useProjectSetting } from '@/hooks/setting/useProjectSetting'
const { navMode } = useProjectSetting()
const getInverted = computed(() => props.inverted)

//***** 锁屏的相关变量 *****/
import { useScreenLockStore } from '@/store/modules/screenLock'
const useLockscreen = useScreenLockStore()

//***** 循环的图标列表 *****
const iconList = [
	{
		icon: SearchOutlined,
		tips: '搜索'
	},
	{
		icon: GithubOutlined,
		eventObject: {
			click: () => {
				window.open('https://www.baidu.com')
			}
		},
		tips: 'github'
	},
	{
		icon: LockOutlined,
		eventObject: {
			click: () => {
				useLockscreen.setLock(true)
			}
		},
		tips: '锁屏'
	}
]

//***** 从全局存储中获取的 *****
const useUserStore = useUser()
const username = useUserStore.showUserName

//***** 全屏切换的相关属性以及操作 *****
const fullscreenIcon = FullscreenOutlined
const toggleFullScreen = () => {
	fullscreenIcon.value = FullscreenOutlined ? FullscreenExitOutlined : FullscreenOutlined
	//! 执行全屏切换的相关操作
	if(!document.fullscreenElement){
		document.documentElement.requestFullscreen()
	}else{
		document.exitFullscreen && document.exitFullscreen()
	}
}

//***** 个人中心的相关属性以及操作 *****
const avatarOptions = [
	{
		label: '个人设置',
		key: 1
	},
	{
		label: '退出登录',
		key: 2
	}
]
const avatarSelect = (key) => {
	if(1 === key){
		router.push({ name: 'Setting' })
	}else if(2 === key) {
		doLogout()
	}
}
// 退出登录操作
const doLogout = () => {
	dialog.warning({
		title: '温馨提示',
		content: '您确定要退出登录吗？',
		negativeText: '我再想想',
		positiveText: '确定',
		onPositiveClick: async () => {
			await useUserStore.logout()
			router.replace({
				name: 'login'
			})
		}
	})
}

//***** 设置的相关属性以及操作 *****
const openSetting = () => {}

</script>

<style lang="less" scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  height: 64px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  transition: all 0.2s ease-in-out;
  width: 100%;
  z-index: 11;

  &-left {
    display: flex;
    align-items: center;

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 64px;
      line-height: 64px;
      overflow: hidden;
      white-space: nowrap;
      padding-left: 10px;

      img {
        width: auto;
        height: 32px;
        margin-right: 10px;
      }

      .title {
        margin-bottom: 0;
      }
    }

    ::v-deep(.ant-breadcrumb span:last-child .link-text) {
      color: #515a6e;
    }

    .n-breadcrumb {
      display: inline-block;
    }

    &-menu {
      color: var(--text-color);
    }
  }

  &-right {
    display: flex;
    align-items: center;
    margin-right: 20px;

    .avatar {
      display: flex;
      align-items: center;
      height: 64px;
    }

    > * {
      cursor: pointer;
    }
  }

  &-trigger {
    display: inline-block;
    width: 64px;
    height: 64px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    .n-icon {
      display: flex;
      align-items: center;
      height: 64px;
      line-height: 64px;
    }

    &:hover {
      background: hsla(0, 0%, 100%, 0.08);
    }

    .anticon {
      font-size: 16px;
      color: #515a6e;
    }
  }

  &-trigger-min {
    width: auto;
    padding: 0 12px;
  }
}

.layout-header-light {
  background: #fff;
  color: #515a6e;

  .n-icon {
    color: #515a6e;
  }

  .layout-header-left {
    ::v-deep(.n-breadcrumb .n-breadcrumb-item:last-child .n-breadcrumb-item__link) {
      color: #515a6e;
    }
  }

  .layout-header-trigger {
    &:hover {
      background: #f8f8f9;
    }
  }
}

.layout-header-fix {
  position: fixed;
  top: 0;
  right: 0;
  left: 200px;
  z-index: 11;
}
</style>
