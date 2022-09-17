/*
 * @Description  :
 * @Version      :
 * @Author       : ydw
 * @Date         : 2022-08-19 11:24:41
 * @LastEditors  : ydw
 * @LastEditTime : 2022-09-15 15:59:20
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 初始化加载路由
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/home/home.vue'),
    meta: {
      keepAlive: true,
    },
  },
]

// 错误页
const commonRouter: Array<RouteRecordRaw> = []

const router = createRouter({
  history: createWebHistory(),
  routes: [...constantRoutes, ...commonRouter],
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { left: 0, top: (to.meta.savedPosition as number) || 0 }
    }
  },
})

export default router
