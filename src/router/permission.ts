/*
 * @Description  :
 * @Version      :
 * @Author       : ydw
 * @Date         : 2022-08-29 17:43:48
 * @LastEditors  : ydw
 * @LastEditTime : 2022-09-15 16:35:59
 */
import router from '@/router'
import progress from '@/utils/progress'
import userStore from '@/store/user'
/**
 * 路由前置
 */
router.beforeEach(async (to, _, next) => {
  // 路由切换前加入进度条
  progress.startLoading()
  // 获取token
  const token = userStore().token
  if (token) {
    //如果已经加载过路由了就不在添加
    if (router.getRoutes().find((item) => item.path === to.path)) {
      if (to.matched.length === 0) {
        router.push(to.path)
      }
      next()
    } else {
      // do something
      next()
    }
  } else {
    next()
  }
})

/**
 * 路由后置
 */
router.afterEach(() => {
  // 路由前换后移除进度条
  progress.endLoading()
})
router.onError(() => {
  // 路由出错时移除进度条
  progress.endLoading()
})
