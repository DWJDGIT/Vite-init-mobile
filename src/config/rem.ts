/*
 * @Description  : 设置rem
 * @Version      : 1.0.0
 * @Author       : ydw
 * @Date         : 2022-08-29 17:27:12
 * @LastEditors  : ydw
 * @LastEditTime : 2022-08-29 17:31:39
 */

;(function (doc, win) {
  const docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      const clientWidth = docEl.clientWidth
      if (!clientWidth) return
      docEl.style.fontSize = 20 * (clientWidth / 320) + 'px'
    }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
