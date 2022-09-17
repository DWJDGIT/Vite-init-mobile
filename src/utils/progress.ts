/*
 * @Description  :
 * @Version      :
 * @Author       : ydw
 * @Date         : 2022-08-29 17:33:32
 * @LastEditors  : ydw
 * @LastEditTime : 2022-08-29 17:39:17
 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 进度条参数配置
NProgress.configure({
  showSpinner: false,
  minimum: 0.2,
  easing: 'swing',
  speed: 1000,
  trickleSpeed: 0.2,
})

class Progress {
  // 防止重复的请求造成进度条重复调用
  private static loadingNum = 0
  public startLoading() {
    if (Progress.loadingNum === 0) {
      NProgress.start()
    }
    Progress.loadingNum++
  }
  public endLoading() {
    if (Progress.loadingNum) {
      Progress.loadingNum--
    }
    if (Progress.loadingNum <= 0) {
      NProgress.done()
    }
  }
}

export default new Progress()
