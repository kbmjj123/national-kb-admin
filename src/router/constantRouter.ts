import { RouteRecordRaw } from "vue-router";

export const constantRouter: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: '/dashboard',
    meta: {
      title: '根目录'
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: '工作台'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  }
]