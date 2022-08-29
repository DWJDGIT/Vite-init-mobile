import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 初始化加载路由
export const constantRoutes: Array<RouteRecordRaw> = []

// 错误页
const commonRouter: Array<RouteRecordRaw> = [] 

const router = createRouter({
  history: createWebHistory(),
  routes: [...constantRoutes, ...commonRouter],
  scrollBehavior: () => ({left: 0, top: 0})
})

export default router